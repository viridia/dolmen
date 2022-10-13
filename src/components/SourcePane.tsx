import { Accessor, createResource, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { sourcePaneStyle } from './styles.css';
import { IFixtureTreeNode } from './tree';
import { Code } from 'dolmen';
import { isServer } from 'solid-js/web';
import { IFixture } from '../fetchFixtures';

const srcPrologue = 'export default "';
const srcEpilogue = '";\n//# sourceMappingURL';

function SourceDisplay(props: { fixture: IFixture }) {
  const [source] = createResource(props.fixture, async fixture => {
    const { path } = fixture;
    const resp = await fetch(`${path}?raw`);
    const text = await resp.text();
    let startIndex = 0;
    if (text.startsWith(srcPrologue)) {
      startIndex = srcPrologue.length;
    }
    let endIndex = text.indexOf(srcEpilogue);
    if (endIndex < 0) {
      endIndex = text.length;
    }
    return JSON.parse(`"${text.slice(startIndex, endIndex)}"`);
  });

  let ref: HTMLDivElement | null;

  return (
    !isServer && (
      <Suspense>
        <Code block class="language-tsx" ref={ref}>
          {source()}
        </Code>
      </Suspense>
    )
  );
}

export const SourcePane: VoidComponent<{ node: Accessor<IFixtureTreeNode | null> }> = props => {
  return (
    <div class={sourcePaneStyle}>
      <Show when={props.node()?.fixture} keyed>
        {fix => <SourceDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
