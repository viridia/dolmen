import { PageHeader, Page, Stack, Spacer, Button, ButtonGroup } from 'dolmen';
import { DarkMode, LightMode } from 'dolmen/icons';
import { createMemo, Match, Resource, Show, Switch } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { IFixtureGroup } from '../listFixtures';
import { CanvasPane } from './CanvasPane';
import { CatalogPane } from './CatalogPane';
import { canvasSectionStyle } from './styles.css';
import { SourcePane } from './SourcePane';
import { useUserSettings } from '../settings';
import { useParams } from 'solid-start';
import { IFixtureTree, IFixtureTreeNode } from './node';

export const CodexPage: VoidComponent<{ fixtures: Resource<IFixtureGroup[]> }> = ({ fixtures }) => {
  const [settings, setSettings] = useUserSettings();

  const fixtureTree = createMemo<IFixtureTree>(
    () => {
      const root: IFixtureTreeNode[] = [];
      const byId: Record<string, IFixtureTreeNode> = {};
      const toSort: IFixtureTreeNode[][] = [root];
      const list = fixtures();
      if (list) {
        // Build tree nodes by coalescing category names
        for (const fix of list) {
          let parent = root;
          for (const dirName of fix.category) {
            let next = parent.find(f => f.name === dirName);
            if (!next) {
              next = {
                name: dirName,
                children: [],
              };
              parent.push(next);
              toSort.push(next.children);
            }
            parent = next.children;
          }

          parent.push(fix);
          byId[fix.urlPath] = fix;
        }

        // Sort nodes
        for (const dir of toSort) {
          dir.sort(compareNodes);
        }
      }

      return {
        children: root,
        byId
      };
    }
  );

  const params = useParams();
  const selected = createMemo(() => {
    const id = params.fixture;
    if (id) {
      return fixtureTree()?.byId[id] ?? null;
    }
  });

  return (
    <Page flexDirection="row">
      <CatalogPane fixtures={fixtureTree()}></CatalogPane>
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader>
          <PageHeader.Title>
            <Show when={selected()} fallback={<i>Nothing selected</i>} keyed>
              {fix => fix.name}
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
            <CanvasPane fixture={selected}></CanvasPane>
          </Match>
          <Match when={settings.displayMode === 'source'}>
            <SourcePane fixture={selected}></SourcePane>
          </Match>
        </Switch>
      </Stack>
    </Page>
  );
};

function compareNodes(left: IFixtureTreeNode, right: IFixtureTreeNode) {
  return left.name.localeCompare(right.name);
}
