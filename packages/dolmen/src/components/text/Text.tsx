import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { css, stdFontSizes } from '../../styles';

export const textCss = css(
  {
    '@layer ui-base': {
      fontFamily: '$body',
      fontSize: '1rem',
    },

    variants: {
      dim: {
        true: {
          color: '$textDim',
        },
      },

      em: {
        true: {
          fontStyle: 'italic',
        },
      },
    },
  },
  stdFontSizes
);

interface TextProps {
  as?:
    | 'span'
    | 'p'
    | 'abbr'
    | 'acronym'
    | 'b'
    | 'bdo'
    | 'cite'
    | 'dfn'
    | 'em'
    | 'i'
    | 'kbd'
    | 'label'
    | 'samp'
    | 'strong'
    | 'sub'
    | 'sup'
    | 'time'
    | 'tt'
    | 'var';
}

export const Text: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & TextProps & VariantProps<typeof textCss>
> = props => {
  const [local, rest] = splitProps(props, ['size', 'as', 'dim', 'em', 'class', 'classList']);

  return (
    <Dynamic
      component={local.as ?? 'span'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [textCss({
          size: local.size,
          dim: local.dim,
          em: local.em,
        })]: true,
      }}
    />
  );
};
