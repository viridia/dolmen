import {
  createEffect,
  createSignal,
  JSX,
  ParentComponent,
  VoidComponent,
  For,
  Show,
} from 'solid-js';
import { Group, Spacer, Table } from 'dolmen';
import css from './mdx.module.scss';
import hljs from 'highlight.js';
import { A } from 'solid-start';
import 'highlight.js/styles/hybrid.css';

// TODO: finish this?
export const DocNav: VoidComponent<{ prev?: string; next: string }> = props => (
  <Group>
    <Show when={props.prev} keyed>
      {link => <A href={link}></A>}
    </Show>
    <Spacer />
    <Show when={props.next}>
      <A href={props.next}></A>
    </Show>
  </Group>
);

export const DemoSection: ParentComponent = props => <div class={css.demo}>{props.children}</div>;

export const ShellExample: ParentComponent = props => (
  <pre class={css.shell}>
    <code>{props.children}</code>
  </pre>
);

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
  <Table class={css.propsTable}>
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

export const HTMLTag: ParentComponent = props => <code>&lt;{props.children}&gt;</code>;

export const UnionType: VoidComponent<{ values: string[] }> = props => (
  <ul>
    <For each={props.values}>
      {value => (
        <li>
          <code>{value}</code>
        </li>
      )}
    </For>
  </ul>
);
