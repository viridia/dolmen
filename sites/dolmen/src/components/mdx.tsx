import { createEffect, createSignal, ParentComponent } from 'solid-js';
import css from './mdx.module.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

export const DemoSection: ParentComponent = props => <div class={css.demo}>{props.children}</div>;

export const SourceCode: ParentComponent = props => {
  const [ref, setRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const elt = ref();
    if (elt) {
      hljs.highlightAll();
    }
  });

  return (
    <div ref={setRef} classList={{ [css.source]: true, hljs: true }}>
      {props.children}
    </div>
  );
};
