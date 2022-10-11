import { ParentComponent, JSX, splitProps } from 'solid-js';
import { codeStyle } from './text.css';

interface CodeProps {
  block?: boolean;
}

export const Code: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & CodeProps> = props => {
  const [local, rest] = splitProps(props, ['block', 'class', 'classList', 'children']);

  // Note: Prism requires that the <pre> element be a separate, surrounding element.
  // We can't just add a "whitespace: pre" style to the <code> element.
  return local.block ? (
    <pre>
      <code
        {...rest}
        classList={{
          ...local.classList,
          [local.class]: true,
          [codeStyle]: true,
        }}
      >
        {local.children}
      </code>
    </pre>
  ) : (
    <code
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [codeStyle]: true,
      }}
    >
      {local.children}
    </code>
  );
};

export default Code;
