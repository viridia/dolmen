import { Drawer, dark, Title, Text, CheckBox, Slider, css, Group } from 'dolmen';
import { IParamInteger, ParamAccessor, useFixtureParamsContext } from 'solid-codex-api';
import {
  createEffect,
  createSignal,
  For,
  Match,
  onMount,
  Show,
  Switch,
  VoidComponent,
} from 'solid-js';
import { useUserSettings } from '../settings';
import { adjustPaneStyle } from './styles.css';

const paramGroupCss = css({
  marginTop: 6,
  marginBottom: 6,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
});

const paramSliderCss = css({
  alignSelf: 'stretch',
  flex: 1,
});

const paramSliderValue = css({
  width: '2rem',
  display: 'flex'

});

const ParamControl: VoidComponent<{ param: ParamAccessor<unknown> }> = props => {
  return (
    <Switch>
      <Match when={props.param.descriptor.type === 'boolean'}>
        <div class={paramGroupCss()}>
          <CheckBox
            checked={props.param() as boolean}
            onChange={e => {
              props.param(e.currentTarget.checked);
            }}
          >
            {props.param.descriptor.caption}
          </CheckBox>
        </div>
      </Match>
      <Match when={props.param.descriptor.type === 'integer'}>
        <div class={paramGroupCss()}>
          <div>{props.param.descriptor.caption}</div>
          <Group gap="xl">
            <Slider
              class={paramSliderCss()}
              value={props.param() as number}
              min={(props.param.descriptor as IParamInteger).minVal ?? 0}
              max={(props.param.descriptor as IParamInteger).maxVal ?? 100}
              step={1}
              onChange={e => {
                props.param(e);
              }}
            />
            <div class={paramSliderValue()}>{props.param() as number}</div>
          </Group>
        </div>
      </Match>
    </Switch>
  );
};

export const AdjustPane: VoidComponent = () => {
  const [settings] = useUserSettings();
  const fixtureParams = useFixtureParamsContext();

  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    // console.log('mounted');
    setIsClient(true);
  });

  createEffect(() => {
    console.log('params', fixtureParams.list());
  });

  return (
    <Drawer
      side="start"
      classList={{ [dark.className]: true, [adjustPaneStyle]: true }}
      open={settings.showAdjust}
      size="300px"
      lift
    >
      <Drawer.Header>
        <Title>Adjust Parameters</Title>
      </Drawer.Header>
      <Drawer.Content>
        <Show when={isClient()}>
          <For
            each={fixtureParams.list()}
            fallback={
              <Text dim em>
                No Parameters
              </Text>
            }
          >
            {p => <ParamControl param={p} />}
          </For>
        </Show>
      </Drawer.Content>
    </Drawer>
  );
};
