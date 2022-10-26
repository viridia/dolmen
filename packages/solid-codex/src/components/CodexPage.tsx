import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  ButtonGroup,
  Page,
  PageHeader,
  Spacer,
  Stack,
} from 'dolmen';
import { DarkMode, LightMode } from 'dolmen/icons';
import { createMemo, For, lazy, Match, Resource, Show, Switch, VoidComponent } from 'solid-js';
import { useParams } from 'solid-start';
import type { IFixture } from '../data/fixtures';
import { Tune } from '../icons';
import { useUserSettings } from '../settings';
import { AdjustPane } from './AdjustPane';
import { CanvasPane } from './CanvasPane';
import { CatalogPane } from './CatalogPane';
import { SourcePane } from './SourcePane';
import { canvasSectionStyle } from './styles.css';
import type { IFixtureTree, IFixtureTreeNode } from './tree';

export const CodexPage: VoidComponent<{ fixtures: Resource<IFixture[]> }> = ({ fixtures }) => {
  const [settings, setSettings] = useUserSettings();

  const fixtureTree = createMemo<IFixtureTree>(() => {
    const root: IFixtureTreeNode[] = [];
    const byId: Record<string, IFixtureTreeNode> = {};
    const toSort: IFixtureTreeNode[][] = [root];
    const list = fixtures();
    if (list) {
      // Build tree nodes by coalescing category names
      for (const fix of list) {
        let parent = root;
        const dirCategory: string[] = [];
        for (const dirName of fix.category) {
          dirCategory.push(dirName);
          let next = parent.find(f => f.title === dirName);
          if (!next) {
            next = {
              title: dirName,
              category: [...dirCategory],
              children: [],
            };
            parent.push(next);
            toSort.push(next.children!);
          }
          parent = next.children!;
        }

        const component = lazy(async () => {
          let component = (await import(fix.path /* @vite-ignore */)).default;
          if (!component) {
            console.error(`No default export: ${fix.path}`);
            return { default: null };
          }
          if (fix.propertyKey) {
            component = component[fix.propertyKey];
          }
          return {
            default: typeof component === 'function' ? component : null,
          };
        });

        const node: IFixtureTreeNode = {
          title: fix.name,
          fixture: fix,
          category: fix.category,
          component,
        };
        parent.push(node);
        byId[fix.urlPath] = node;
      }

      // Sort nodes
      for (const dir of toSort) {
        dir.sort(compareNodes);
      }
    }

    return {
      children: root,
      byId,
    };
  });

  const params = useParams();
  const selected = createMemo(() => {
    const id = params.fixture;
    if (id) {
      return fixtureTree()?.byId[id] ?? null;
    }
  });

  return (
    <Page flexDirection="row">
      <CatalogPane tree={fixtureTree()} />
      <AdjustPane />
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader zIndex={0} gap="md">
          <PageHeader.Title>
            <Show when={selected()} fallback={<i>Nothing selected</i>} keyed>
              {fix => (
                <Breadcrumbs>
                  <For each={fix.category}>
                    {category => <BreadcrumbsItem>{category}</BreadcrumbsItem>}
                  </For>
                  <BreadcrumbsItem>{fix.title}</BreadcrumbsItem>
                </Breadcrumbs>
              )}
            </Show>
          </PageHeader.Title>
          <Spacer />
          <ButtonGroup>
            <Button
              onClick={() => {
                setSettings({ displayMode: 'canvas' });
              }}
              selected={settings.displayMode === 'canvas'}
            >
              Canvas
            </Button>
            <Button
              onClick={() => {
                setSettings({ displayMode: 'source' });
              }}
              selected={settings.displayMode === 'source'}
            >
              Source
            </Button>
          </ButtonGroup>
          <Button
            icon
            color="subtle"
            selected={settings.showAdjust}
            aria-label="Toggle Adjustment Panel"
            onClick={() => {
              setSettings(s => ({ showAdjust: !s.showAdjust }));
            }}
          >
            <Tune />
          </Button>
          <Button
            icon
            color="subtle"
            aria-label={settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            onClick={() => {
              setSettings(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }));
            }}
          >
            <Show when={settings.theme === 'dark'} fallback={<LightMode />}>
              <DarkMode />
            </Show>
          </Button>
        </PageHeader>
        <Switch>
          <Match when={settings.displayMode === 'canvas'}>
            <CanvasPane node={selected}></CanvasPane>
          </Match>
          <Match when={settings.displayMode === 'source'}>
            <SourcePane node={selected}></SourcePane>
          </Match>
        </Switch>
      </Stack>
    </Page>
  );
};

function compareNodes(left: IFixtureTreeNode, right: IFixtureTreeNode) {
  return left.title.localeCompare(right.title);
}
