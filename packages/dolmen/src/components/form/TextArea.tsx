import { JSX, splitProps, useContext, VoidComponent } from 'solid-js';
import { VariantProps } from '@stitches/core';
import { css, fontSize, SizeVariant, scrollbars, styleProps, LayoutProps } from '../../styles';
import { FormFieldContext } from './FormFieldContext';

const inputSize = (base: SizeVariant) => ({
  fontSize: fontSize[base],
});

const textAreaCss = css(
  {
    ...inputSize('md'),
    backgroundColor: '$fieldBg',
    color: '$text',
    alignItems: 'center',
    appearance: 'none',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$fieldBorderSlight',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: '$body',
    fontWeight: '350',
    outline: 'none',
    justifyContent: 'center',
    padding: '4px 6px',
    resize: 'none',
    '--icon-color': '$colors$textDim',

    '&:hover:not(.dm-disabled)': {
      borderColor: '$fieldHoverBorder',
    },

    '&:focus-within': {
      boxShadow: '0 0 0 2px inset $colors$focus',
    },

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
      opacity: 0.6,
      cursor: 'not-allowed',
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

type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & LayoutProps;

export const TextArea: VoidComponent<TextAreaProps & VariantProps<typeof textAreaCss>> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['size', 'color', 'class', 'classList']);
  const fieldState = useContext(FormFieldContext);
  return (
    <textarea
      {...rest}
      {...fieldState?.ariaProps()}
      classList={{
        ...local.classList,
        ...layoutCss,
        'dm-disabled': rest.disabled,
        [local.class as string]: !!local.class,
        [textAreaCss({
          size: local.size,
        })]: true,
      }}
    />
  );
};
