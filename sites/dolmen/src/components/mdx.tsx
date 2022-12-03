import { createEffect, createSignal, JSX, ParentComponent, VoidComponent } from 'solid-js';
import { Table } from 'dolmen';
import css from './mdx.module.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

export const DemoSection: ParentComponent = props => <div class={css.demo}>{props.children}</div>;

export const SourceCode: ParentComponent = props => {
  const [ref, setRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const elt = ref();
    if (elt) {
      hljs.highlightElement(elt.firstChild?.firstChild as HTMLElement);
    }
  });

  return (
    <div ref={setRef} classList={{ [css.source]: true, hljs: true }}>
      {props.children}
    </div>
  );
};

export const PageOutline: ParentComponent = props => (
  <div class={css.pageOutline}>{props.children}</div>
);

export const PropsTable: ParentComponent = props => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Description</Table.Cell>
        <Table.Cell>Type</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>{props.children}</Table.Body>
  </Table>
);

export const PropsItem: VoidComponent<{
  name: string;
  description: JSX.Element;
  type: JSX.Element;
}> = props => (
  <Table.Row>
    <Table.Cell>{props.name}</Table.Cell>
    <Table.Cell>{props.description}</Table.Cell>
    <Table.Cell>{props.type}</Table.Cell>
  </Table.Row>
);

export const HTMLTag: ParentComponent = props => (<code>&lt;{props.children}&gt;</code>)
