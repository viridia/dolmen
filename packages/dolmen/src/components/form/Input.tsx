import { JSX, splitProps, Component } from 'solid-js';
import { VariantProps } from '@stitches/core';
import { css, remHeight, SizeVariant } from '../../styles';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  adornLeft?: JSX.Element | JSX.Element[];
  adornRight?: JSX.Element | JSX.Element[];
}

const inputSize = (base: SizeVariant) => ({
  height: `${remHeight[base]}rem`,
  fontSize: `$fontSizes$${base}`,
});

export const inputFrameCss = css({
  ...inputSize('md'),
  backgroundColor: '$inputBg',
  color: '$inputText',
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$inputBorder',
  display: 'flex',
  flexDirection: 'row',
  fontWeight: '350',
  outline: 'none',
  justifyContent: 'center',
  padding: '0 6px',
  '--icon-color': '$colors$inputIcon',

  '&:hover:not([disabled])': {
    borderColor: '$inputBorder',
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

    icon: {
      true: {
        padding: 0,
        aspectRatio: '1',
      },
    },
  },
});

export const inputElementCss = css({
  alignSelf: 'stretch',
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  color: '$inputText',
  outline: 'none',
  fontFamily: '$body',
  fontSize: 'inherit',
  margin: '0 2px',
  flex: 1,

  '&::selection': {
    background: '$inputSelectionText',
    color: '$inputSelectionBg',
  },

  '&[disabled]': {
    opacity: 0.5,
  },
});

export const adornCss = css({
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
});

export const adornLeftCss = css(adornCss, {
  marginLeft: -2,
});

export const adornRightCss = css(adornCss, {
  marginRight: -2,
});

export const Input: Component<InputProps & VariantProps<typeof inputFrameCss>> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'color',
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
