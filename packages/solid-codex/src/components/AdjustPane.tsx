import { Drawer, dark, Title, ScrollArea, Code } from 'dolmen';
import { useCodex } from 'solid-codex-api';
import { VoidComponent } from 'solid-js';
import { unstable_clientOnly } from 'solid-start';
import { useUserSettings } from '../settings';
import { adjustPaneStyle } from './styles.css';

const ParamsEditorClient = unstable_clientOnly(() => import('./ParamsEditor'));

export const AdjustPane: VoidComponent = () => {
  const [settings] = useUserSettings();
  const codex = useCodex();
  // const [isClient, setIsClient] = createSignal(false);

  // onMount(() => {
  //   setTimeout(() => {
  //     setIsClient(true);
  //   }, 10);
  // });

  return (
    <Drawer
      side="start"
      classList={{ [dark.className]: true, [adjustPaneStyle]: true }}
      open={settings.showAdjust}
      size="300px"
    >
      <Drawer.Header>
        <Title>Adjust Parameters</Title>
      </Drawer.Header>
      <Drawer.Content flex="0 1 auto">
        <ParamsEditorClient />
      </Drawer.Content>
      <Drawer.Content flex="1 1 auto">
        <Title>Event Log</Title>
        <ScrollArea alignSelf="stretch" flex="1 1 0" mb="lg">
          <Code size="xs">
            <pre>{codex.logs().join('\n')}</pre>
          </Code>
        </ScrollArea>
      </Drawer.Content>
    </Drawer>
  );
};
