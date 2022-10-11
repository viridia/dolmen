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
import { useUserSettings } from '../settings';

export const CodexPage: VoidComponent<{ fixtures: Resource<IFixtureGroup[]> }> = ({ fixtures }) => {
  const selected = createSignal<IFixtureTreeNode | null>(null);
  const [settings, setSettings] = useUserSettings();

  return (
    <Page flexDirection="row">
      <CatalogPane fixtures={fixtures} selected={selected}></CatalogPane>
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader>
          <PageHeader.Title>
            <Show when={selected[0]?.()} fallback={<i>Nothing selected</i>} keyed>
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
            <CanvasPane fixture={selected[0]}></CanvasPane>
          </Match>
          <Match when={settings.displayMode === 'source'}>
            <SourcePane fixture={selected[0]}></SourcePane>
          </Match>
        </Switch>
      </Stack>
    </Page>
  );
};
