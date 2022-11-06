import { JSX, splitProps, Component } from 'solid-js';
import { VariantProps } from '@stitches/core';
import {
  css,
  fontSize,
  size,
  SizeVariant,
  scrollbars,
  styleProps,
  LayoutProps,
} from '../../styles';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  adornLeft?: JSX.Element | JSX.Element[];
  adornRight?: JSX.Element | JSX.Element[];
}

const inputSize = (base: SizeVariant) => ({
  height: size[base],
  fontSize: fontSize[base],
});

const inputFrameCss = css(
  {
    ...inputSize('md'),
    backgroundColor: '$fieldBg',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$fieldBorderSlight',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '350',
    outline: 'none',
    justifyContent: 'center',
    padding: '0 6px',
    '--icon-color': '$colors$textDim',

    '&:hover:not(.dm-disabled)': {
      borderColor: '$fieldHoverBorder',
    },

    '&:focus-within': {
      boxShadow: '0 0 0 2px inset $colors$focus',
    },

    variants: {
      size: {
        xl: inputSize('xl'),
        lg: inputSize('lg'),
        md: inputSize('md'),
        sm: inputSize('sm'),
        xs: inputSize('xs'),
      },

      round: {
        true: {
          borderRadius: '500px',
          padding: '0 8px',
        },
      },
    },
  },
  scrollbars
);

const inputElementCss = css({
  alignSelf: 'stretch',
  backgroundColor: 'transparent',
  border: 'none',
  color: '$text',
  outline: 'none',
  fontFamily: '$body',
  fontSize: 'inherit',
  margin: '0 2px',
  flex: 1,

  '&::selection': {
    background: '$textSelectionBg',
    color: '$textSelection',
  },

  '&::placeholder': {
    color: '$textDim',
  },

  '&:disabled': {
    opacity: 0.5,
  },

  '&[readonly]': {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
});

const adornCss = css({
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
});

const adornLeftCss = css(adornCss, {
  marginLeft: -2,
});

const adornRightCss = css(adornCss, {
  marginRight: -2,
});

export const Input: Component<
  InputProps & LayoutProps & VariantProps<typeof inputFrameCss>
> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
    'size',
    'round',
    'adornLeft',
    'adornRight',
    'class',
    'classList',
  ]);
  return (
    <div
      classList={{
        ...local.classList,
        ...layoutCss,
        'dm-disabled': rest.disabled,
        [local.class as string]: !!local.class,
        [inputFrameCss({
          size: local.size,
          round: local.round,
        })]: true,
      }}
    >
      {props.adornLeft && <div class={adornLeftCss()}>{props.adornLeft}</div>}
      <input {...rest} class={inputElementCss()} />
      {props.adornRight && <div class={adornRightCss()}>{props.adornRight}</div>}
    </div>
  );
};
