import { Accessor, createResource } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { sourcePaneStyle } from './styles.css';
import { IFixtureTreeNode } from './node';
import { Code } from 'dolmen';

function SourceDisplay(props: { fixture: IFixtureTreeNode }) {
  const [source] = createResource(props.fixture, async fixture => {
    const { path } = fixture;
    const resp = (await fetch(path));
    return await resp.text();
  });

  return (
    <Show when={source.state === 'ready'} keyed>
      {() => <Code>{source()}</Code>}
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
