import { Drawer, Header, ScrollArea, CodeBlock } from 'dolmen';
import { useCodex } from 'solid-codex-api';
import { createEffect, createSignal, Show, VoidComponent } from 'solid-js';
import { unstable_clientOnly } from 'solid-start';
import { useUserSettings } from '../settings';
import {
  adjustPaneStyle,
  adjustPaneParamsSection,
  adjustPaneLogSection,
  adjustPaneEventLog,
} from './styles.css';

const ParamsEditorClient = unstable_clientOnly(() => import('./ParamsEditor'));

export const AdjustPane: VoidComponent = () => {
  const [settings] = useUserSettings();
  const codex = useCodex();
  const [isClient, setIsClient] = createSignal(false);

  // onMount(() => {
  //   setTimeout(() => {
  //     setIsClient(true);
  //   }, 10);
  // });

  createEffect(() => {
    setIsClient(true);
  });

  return (
    <Drawer
      side="start"
      classList={{ 'dm-theme-dark': true, [adjustPaneStyle]: true }}
      open={settings.showAdjust}
      size="300px"
    >
      <Show when={isClient()}>
        <Drawer.Header>
          <Header>Adjust Parameters</Header>
        </Drawer.Header>
        <Drawer.Content class={adjustPaneParamsSection}>
          <ParamsEditorClient />
        </Drawer.Content>
        <Drawer.Content class={adjustPaneLogSection}>
          <Header>Event Log</Header>
          <ScrollArea class={adjustPaneEventLog}>
            <CodeBlock size="xs">{codex.logs().join('\n')}</CodeBlock>
          </ScrollArea>
        </Drawer.Content>
      </Show>
    </Drawer>
  );
};
