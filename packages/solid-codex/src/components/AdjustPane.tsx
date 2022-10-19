import { Drawer, dark, Title } from 'dolmen';
import { createSignal, onMount, Show, VoidComponent } from 'solid-js';
import { unstable_clientOnly } from 'solid-start';
import { useUserSettings } from '../settings';
import { adjustPaneStyle } from './styles.css';

const ParamsEditorClient = unstable_clientOnly(() => import('./ParamsEditor'));

export const AdjustPane: VoidComponent = () => {
  const [settings] = useUserSettings();
  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 10);
  });

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
      <Drawer.Content>
        <Show when={isClient()}>
          <ParamsEditorClient />
        </Show>
      </Drawer.Content>
    </Drawer>
  );
};
