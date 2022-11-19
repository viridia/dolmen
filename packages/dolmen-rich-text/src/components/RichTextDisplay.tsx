import { JSX, splitProps, VoidComponent } from 'solid-js';
import { VariantProps } from '@stitches/core';
import { css, fontSize, SizeVariant, scrollbars, styleProps, LayoutProps } from 'dolmen';

interface RichTextDisplayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const inputSize = (base: SizeVariant) => ({
  fontSize: fontSize[base],
});

const rtDisplayCss = xcss(
  {
    backgroundColor: '$fieldBg',
    color: '$text',
    alignItems: 'stretch',
    // borderRadius: 3,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '$fieldBorderSlight',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '$body',
    fontSize: fontSize.md,
    fontWeight: '350',
    padding: '6px',

    '& p:first-child': {
      marginTop: 0,
    },

    '& p:last-child': {
      marginBottom: 0,
    },

    variants: {
      size: {
        xl: inputSize('xl'),
        lg: inputSize('lg'),
        md: inputSize('md'),
        sm: inputSize('sm'),
        xs: inputSize('xs'),
      },
    },
  },
  scrollbars
);

export const RichTextDisplay: VoidComponent<
  RichTextDisplayProps & LayoutProps & VariantProps<typeof rtDisplayCss>
> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['size', 'class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [rtDisplayCss({
          size: local.size,
        })]: true,
      }}
    />
  );
};
