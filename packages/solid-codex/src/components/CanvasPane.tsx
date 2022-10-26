import { css, scrollbars } from 'dolmen';
import { useCodex } from 'solid-codex-api';
import { Accessor, Component, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { IFixtureTreeNode } from './tree';

export const canvasPaneCss = css(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: 8,
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  scrollbars
);

const ResetCodex = () => {
  const codex = useCodex();

  codex.clearParams();
  codex.clearLogs();

  return null;
}

function FixtureDisplay(props: { component: Component }) {
  const C = props.component;
  return (
    <Suspense>
      <ResetCodex />
      <C />
    </Suspense>
  );
}

export const CanvasPane: VoidComponent<{
  node: Accessor<IFixtureTreeNode | undefined>;
}> = props => {
  return (
    <div class={canvasPaneCss()}>
      <Show when={props.node()?.component} keyed>
        {cmp => <FixtureDisplay component={cmp} />}
      </Show>
    </div>
  );
};
