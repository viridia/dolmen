import { Text, CheckBox, Slider, css, Group } from 'dolmen';
import { IParamInteger, ParamAccessor, useCodex } from 'solid-codex-api';
import {
  For,
  Match,
  Switch,
  VoidComponent,
} from 'solid-js';

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
  display: 'flex',
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
              valueLabelDisplay="auto"
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

const ParamsEditor: VoidComponent = () => {
  const fixtureParams = useCodex();
  return (
    <For
      each={fixtureParams.listParams()}
      fallback={
        <Text dim em>
          No Parameters
        </Text>
      }
    >
      {p => <ParamControl param={p} />}
    </For>
  );
};

export default ParamsEditor;
