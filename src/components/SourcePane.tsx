import { Accessor, createResource } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { sourcePaneStyle } from './styles.css';
import { IFixtureTreeNode } from './node';
import { Code } from 'dolmen';

const srcPrologue = 'export default "';
const srcEpilotue = '";\n//# sourceMappingURL';

function SourceDisplay(props: { fixture: IFixtureTreeNode }) {
  const [source] = createResource(props.fixture, async fixture => {
    const { path } = fixture;
    const resp = await fetch(`${path}?raw`);
    const text = await resp.text();
    let startIndex = 0;
    if (text.startsWith(srcPrologue)) {
      startIndex = srcPrologue.length;
    }
    let endIndex = text.indexOf(srcEpilotue);
    if (endIndex < 0) {
      endIndex = text.length;
    }
    return text.slice(startIndex, endIndex).split('\\n').join('\n').replaceAll('\\"', '"');
  });

  let ref: HTMLDivElement | null;

  return (
    <Show when={source.state === 'ready'} keyed>
      {() => (
        <Code block class="language-tsx" ref={ref}>
          {source()}
        </Code>
      )}
    </Show>
  );
}

export const SourcePane: VoidComponent<{ fixture: Accessor<IFixtureTreeNode | null> }> = props => {
  return (
    <div class={sourcePaneStyle}>
      <Show when={props.fixture()} keyed>
        {fix => <SourceDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
