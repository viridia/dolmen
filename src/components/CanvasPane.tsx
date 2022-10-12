import { Accessor, createResource, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { canvasPaneStyle } from './styles.css';
import { IFixtureTreeNode } from './node';
import { IFixture } from '../fetchFixtures';

function FixtureDisplay(props: { fixture: IFixture }) {
  const [module] = createResource(
    props.fixture,
    async fixture => {
      const { path, propertyKey } = fixture;
      let component = (await import(path /* @vite-ignore */)).default;
      if (!component) {
        console.error(`No default export: ${path}`);
        return null;
      }
      if (propertyKey) {
        component = component[propertyKey];
      }
      return typeof component === 'function' ? component : null;
    },
    {
      deferStream: true,
    }
  );

  return <Suspense>{() => module()}</Suspense>;
}

export const CanvasPane: VoidComponent<{ node: Accessor<IFixtureTreeNode | null> }> = props => {
  return (
    <div class={canvasPaneStyle}>
      <Show when={props.node()?.fixture} keyed>
        {fix => <FixtureDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
