import {
  createEffect,
  createSignal,
  JSX,
  ParentComponent,
  VoidComponent,
  For,
  Show,
  createMemo,
} from 'solid-js';
import { Group, Nav, Spacer, Table } from 'dolmen';
import css from './mdx.module.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';
import { pageIndexFlat } from './pageIndex';
import { A } from 'solid-start';
import { useLocation } from '@solidjs/router';

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

export const PageOutline: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => (
  <div {...props} class={css.pageOutline}>
    {props.children}
  </div>
);

export const PropsTable: ParentComponent = props => (
  <Table class={css.propsTable}>
    <Table.Head>
      <Table.Row>
        <Table.Cell class={css.propsTableName}>Name</Table.Cell>
        <Table.Cell class={css.propsTableType}>Type</Table.Cell>
        <Table.Cell>Description</Table.Cell>
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
    <Table.Cell>{props.type}</Table.Cell>
    <Table.Cell>{props.description}</Table.Cell>
  </Table.Row>
);

export const HTMLTag: ParentComponent = props => <code>&lt;{props.children}&gt;</code>;

export const UnionType: VoidComponent<{ values: string[] }> = props => (
  <ul>
    <For each={props.values}>
      {value => (
        <li class={css.unionMember}>
          <code>'{value}'</code>
        </li>
      )}
    </For>
  </ul>
);

export const DocNav: VoidComponent = () => {
  const location = useLocation();

  const nav = createMemo(() => {
    const index = pageIndexFlat.findIndex(page => page.href === location.pathname);
    const prev = index > 0 ? pageIndexFlat[index - 1] : null;
    const next = index >= 0 && index < pageIndexFlat.length - 1 ? pageIndexFlat[index + 1] : null;
    return { next, prev };
  });
  return (
    <Group class={css.docNav}>
      <Show when={nav().prev} keyed>
        {page => (
          <Nav.Prev as={A} href={page.href} end>
            {page.title}
          </Nav.Prev>
        )}
      </Show>
      <Spacer />
      <Show when={nav().next} keyed>
        {page => (
          <Nav.Next as={A} href={page.href} end>
            {page.title}
          </Nav.Next>
        )}
      </Show>
    </Group>
  );
};
