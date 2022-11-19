import { useCodex } from 'solid-codex-api';
import { Accessor, Component, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { IFixtureTreeNode } from './tree';
import { canvasPaneCss } from './styles.css';

const ResetCodex = () => {
  const codex = useCodex();

  codex.clearParams();
  codex.clearLogs();

  return null;
};

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
    <div classList={{ [canvasPaneCss]: true, 'dm-scrollbars': true }}>
      <Show when={props.node()?.component} keyed>
        {cmp => <FixtureDisplay component={cmp} />}
      </Show>
    </div>
  );
};
