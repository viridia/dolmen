import { Button, ButtonGroup, Page, PageHeader, Spacer, Stack } from 'dolmen';
import { DarkMode, LightMode } from 'dolmen/icons';
import { createMemo, lazy, Match, Resource, Show, Switch, VoidComponent } from 'solid-js';
import { useParams } from 'solid-start';
import type { IFixture } from '../data/fixtures';
import { useUserSettings } from '../settings';
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
        for (const dirName of fix.category) {
          let next = parent.find(f => f.title === dirName);
          if (!next) {
            next = {
              title: dirName,
              children: [],
            };
            parent.push(next);
            toSort.push(next.children);
          }
          parent = next.children;
        }

        const component = lazy(async () => {
          let component = (await import(fix.path /* @vite-ignore */)).default;
          if (!component) {
            console.error(`No default export: ${fix.path}`);
            return null;
          }
          if (fix.propertyKey) {
            component = component[fix.propertyKey];
          }
          return typeof component === 'function' ? { default: component } : null;
        });

        const node: IFixtureTreeNode = {
          title: fix.name,
          fixture: fix,
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
      <CatalogPane tree={fixtureTree()}></CatalogPane>
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader>
          <PageHeader.Title>
            <Show when={selected()} fallback={<i>Nothing selected</i>} keyed>
              {fix => fix.title}
            </Show>
          </PageHeader.Title>
          <Spacer />
          <ButtonGroup>
            <Button
              onClick={e => {
                setSettings({ displayMode: 'canvas' });
              }}
              selected={settings.displayMode === 'canvas'}
            >
              Canvas
            </Button>
            <Button
              onClick={e => {
                setSettings({ displayMode: 'source' });
              }}
              selected={settings.displayMode === 'source'}
            >
              Source
            </Button>
          </ButtonGroup>
          <Button
            round
            icon
            color="subtle"
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
