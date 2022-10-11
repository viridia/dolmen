import { Accessor, createResource, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { canvasPaneStyle } from './styles.css';
import { IFixtureTreeNode } from './node';

function FixtureDisplay(props: { fixture: IFixtureTreeNode }) {
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

export const CanvasPane: VoidComponent<{ fixture: Accessor<IFixtureTreeNode | null> }> = props => {
  return (
    <div class={canvasPaneStyle}>
      <Show when={props.fixture()} keyed>
        {fix => <FixtureDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
