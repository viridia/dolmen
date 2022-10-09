import { PageHeader, Page, Stack, Spacer, Button } from 'dolmen';
import { DarkMode, LightMode } from 'dolmen/icons';
import { createSignal, Resource, Show, Switch } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { darkMode, setDarkMode } from '../darkMode';
import { IFixtureGroup } from '../listFixtures';
import { CanvasPane } from './CanvasPane';
import { CatalogPane } from './CatalogPane';
import { canvasSectionStyle } from './codexpage.css';
import { IFixtureTreeNode } from './node';

export const CodexPage: VoidComponent<{ fixtures: Resource<IFixtureGroup[]> }> = ({ fixtures }) => {
  const selected = createSignal<IFixtureTreeNode | null>(null);

  return (
    <Page flexDirection="row">
      <CatalogPane fixtures={fixtures} selected={selected}></CatalogPane>
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader>
          <Show when={selected[0]?.()} fallback={<span>Nothing selected</span>} keyed>
            {fix => fix.name}
          </Show>
          <Spacer />
          <Button
            round
            icon
            color="subtle"
            onClick={() => {
              setDarkMode(mode => !mode);
            }}
          >
            <Show when={darkMode()} fallback={<LightMode />}>
              <DarkMode />
            </Show>
          </Button>
        </PageHeader>
        <CanvasPane fixture={selected[0]}></CanvasPane>
      </Stack>
    </Page>
  );
};
