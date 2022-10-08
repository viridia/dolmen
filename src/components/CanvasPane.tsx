import { Accessor, createResource } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { IFixtureGroup } from '../listFixtures';
import { canvasPaneStyle } from './codexpage.css';

function FixtureDisplay(props: { fixture: IFixtureGroup }) {
  const [module] = createResource(props.fixture, async fixture => {
    const { path, key } = fixture;
    let component = (await import(path /* @vite-ignore */ )).default;
    if (!component) {
      console.log(`No default export: ${path}`);
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

export const CanvasPane: VoidComponent<{ fixture: Accessor<IFixtureGroup | null> }> = props => {
  return (
    <div class={canvasPaneStyle}>
      <Show when={props.fixture()} keyed>
        {fix => <FixtureDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
