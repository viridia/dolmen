import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, stdFontSizes } from '../../styles';

export const codeCss = css(
  {
    fontFamily: '$mono',
    fontSize: '1rem',
  },
  stdFontSizes
);

export const codeBlockCss = css(
  {
    fontFamily: '$mono',
    fontSize: '0.8rem',
    lineHeight: '1.1rem',
  },
  stdFontSizes
);

const preCss = css({
  margin: 0,
});

interface CodeProps {
  block?: boolean;
}

/** Inline code element. */
export const Code: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & CodeProps & VariantProps<typeof codeCss>
> = props => {
  const [local, rest] = splitProps(props, ['size', 'class', 'classList']);

  return (
    <code
      {...rest}
      classList={{
        ...local.classList,
        [local as string]: !!local.class,
        [codeCss({
          size: local.size,
        })]: true,
      }}
    />
  );
};

/** Code block. */
export const CodeBlock: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & CodeProps & VariantProps<typeof codeCss>
> = props => {
  const [local, rest] = splitProps(props, ['size', 'class', 'classList']);

  // Note: Prism requires that the <pre> element be a separate, surrounding element.
  // We can't just add a "whitespace: pre" style to the <code> element.
  return (
    <pre class={preCss()}>
      <code
        {...rest}
        classList={{
          ...local.classList,
          [local.class as string]: !!local.class,
          [codeBlockCss({
            size: local.size,
          })]: true,
        }}
      />
    </pre>
  );
};
