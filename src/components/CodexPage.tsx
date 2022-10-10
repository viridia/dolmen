import { PageHeader, Page, Stack, Spacer, Button, ButtonGroup, theme } from 'dolmen';
import { DarkMode, LightMode } from 'dolmen/icons';
import { createEffect, createSignal, Match, Resource, Show, Switch } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { IFixtureGroup } from '../listFixtures';
import { CanvasPane } from './CanvasPane';
import { CatalogPane } from './CatalogPane';
import { canvasSectionStyle } from './styles.css';
import { IFixtureTreeNode } from './node';
import { SourcePane } from './SourcePane';
import { settings, setSettings } from '../settings';

export const CodexPage: VoidComponent<{ fixtures: Resource<IFixtureGroup[]> }> = ({ fixtures }) => {
  const selected = createSignal<IFixtureTreeNode | null>(null);
  const [displayMode, setDisplayMode] = createSignal<'canvas' | 'source'>('canvas');

  return (
    <Page flexDirection="row">
      <CatalogPane fixtures={fixtures} selected={selected}></CatalogPane>
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader>
          <Show when={selected[0]?.()} fallback={<span>Nothing selected</span>} keyed>
            {fix => fix.name}
          </Show>
          <Spacer />
          <ButtonGroup>
            <Button
              onClick={e => {
                setDisplayMode('canvas');
              }}
            >
              Canvas
            </Button>
            <Button
              onClick={e => {
                setDisplayMode('source');
              }}
            >
              Source
            </Button>
          </ButtonGroup>
          <Button
            round
            icon
            color="subtle"
            onClick={() => {
              setSettings('theme', settings.theme === 'dark' ? 'light' : 'dark');
            }}
          >
            <Show when={settings.theme === 'dark'} fallback={<LightMode />}>
              <DarkMode />
            </Show>
          </Button>
        </PageHeader>
        <Switch>
          <Match when={displayMode() === 'canvas'}>
            <CanvasPane fixture={selected[0]}></CanvasPane>
          </Match>
          <Match when={displayMode() === 'source'}>
            <SourcePane fixture={selected[0]}></SourcePane>
          </Match>
        </Switch>
      </Stack>
    </Page>
  );
};
