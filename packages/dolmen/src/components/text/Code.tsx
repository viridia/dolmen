import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, stdFontSizes } from '../../styles';

const codeCss = css(
  {
    fontFamily: '$mono',
    fontSize: '1rem',
  },
  stdFontSizes
);

interface CodeProps {
  block?: boolean;
}

export const Code: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & CodeProps & VariantProps<typeof codeCss>
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
          [local.class as string]: !!local.class,
          [codeCss({
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
        [local as string]: !!local.class,
        [codeCss({
          size: local.size,
        })]: true,
      }}
    >
      {local.children}
    </code>
  );
};
