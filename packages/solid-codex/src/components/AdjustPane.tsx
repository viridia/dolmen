import { Drawer, theme, Title } from 'dolmen';
import { useFixtureParamsContext } from 'solid-codex-api';
import { createEffect, createSignal, For, onMount, Show, VoidComponent } from 'solid-js';
import { useUserSettings } from '../settings';
import { adjustPaneStyle } from './styles.css';

export const AdjustPane: VoidComponent = () => {
  const [settings] = useUserSettings();
  const fixtureParams = useFixtureParamsContext();

  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    console.log('mounted');
    setIsClient(true);
  });

  createEffect(() => {
    console.log(fixtureParams.list());
  });

  return (
    <Drawer
      side="start"
      classList={{ [theme.dark.className]: true, [adjustPaneStyle]: true }}
      open={settings.showAdjust}
      size="300px"
    >
      <Drawer.Header>
        <Title>Adjust Parameters</Title>
      </Drawer.Header>
      <Drawer.Content>
        <Show when={isClient()}>
          <For each={fixtureParams.list()} fallback={<i>No Parameters</i>}>
            {p => <div>{p.type.caption}</div>}
          </For>
        </Show>
      </Drawer.Content>
    </Drawer>
  );
};
