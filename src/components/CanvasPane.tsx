import { Accessor, createResource } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { canvasPaneStyle } from './styles.css';
import { IFixtureTreeNode } from './node';

function FixtureDisplay(props: { fixture: IFixtureTreeNode }) {
  const [module] = createResource(props.fixture, async fixture => {
    const { path, key } = fixture;
    let component = (await import(path /* @vite-ignore */ )).default;
    if (!component) {
      console.error(`No default export: ${path}`);
      return null;
    }
    if (key) {
      component = component[key];
    }
    return typeof component === 'function' ? component : null;
  });

  return (
    <Show when={module.state === 'ready'} keyed>
      {() => module()}
    </Show>
  );
}

export const CanvasPane: VoidComponent<{ fixture: Accessor<IFixtureTreeNode | null> }> = props => {
  return (
    <div class={canvasPaneStyle}>
      <Show when={props.fixture()} keyed>
        {fix => <FixtureDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
