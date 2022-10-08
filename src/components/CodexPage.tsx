import { PageHeader, Page, Stack } from 'dolmen';
import { createSignal, Resource, Show } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { IFixtureGroup } from '../listFixtures';
import { CanvasPane } from './CanvasPane';
import { CatalogPane } from './CatalogPane';
import { canvasSectionStyle } from './codexpage.css';

export const CodexPage: VoidComponent<{ fixtures: Resource<IFixtureGroup[]> }> = ({ fixtures }) => {
  const selected = createSignal<IFixtureGroup | null>(null);

  return (
    <Page flexDirection="row">
      <CatalogPane fixtures={fixtures} selected={selected}></CatalogPane>
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <PageHeader>
          <Show when={selected[0]?.()} fallback={<span>Nothing selected</span>} keyed>
            {fix => fix.name}
          </Show>
        </PageHeader>
        <CanvasPane fixture={selected[0]}></CanvasPane>
      </Stack>
    </Page>
  );
};
