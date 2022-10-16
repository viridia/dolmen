import { useFixtureParamsContext } from 'solid-codex-api';
import { Accessor, Component, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { canvasPaneStyle } from './styles.css';
import { IFixtureTreeNode } from './tree';

function FixtureDisplay(props: { component: Component }) {
  const fixtureParams = useFixtureParamsContext();

  fixtureParams.clear();
  const C = props.component;
  return (
    <Suspense>
      <C />
    </Suspense>
  );
}

export const CanvasPane: VoidComponent<{ node: Accessor<IFixtureTreeNode | undefined> }> = props => {
  return (
    <div class={canvasPaneStyle}>
      <Show when={props.node()?.component} keyed>
        {cmp => <FixtureDisplay component={cmp} />}
      </Show>
    </div>
  );
};
