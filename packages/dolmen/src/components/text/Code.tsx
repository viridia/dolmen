import { ParentComponent, JSX, splitProps } from 'solid-js';
import { codeStyle, CodeStyleProps } from './text.css';

interface CodeProps {
  block?: boolean;
}

export const Code: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & CodeProps & CodeStyleProps
> = props => {
  const [local, rest] = splitProps(props, ['size', 'block', 'class', 'classList', 'children']);

  // Note: Prism requires that the <pre> element be a separate, surrounding element.
  // We can't just add a "whitespace: pre" style to the <code> element.
  return local.block ? (
    <pre>
      <code
        {...rest}
        classList={{
          ...local.classList,
          [local.class ?? '']: true,
          [codeStyle({
            size: local.size,
          })]: true,
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
        [local.class ?? '']: true,
        [codeStyle({
          size: local.size,
        })]: true,
    }}
    >
      {local.children}
    </code>
  );
};

export default Code;
