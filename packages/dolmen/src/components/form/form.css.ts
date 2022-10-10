import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { remHeight, SizeVariant } from '../../styles/sizes';
import { theme } from '../../styles/theme.css';

const inputSize = (base: SizeVariant) => ({
  height: `${remHeight[base]}rem`,
  fontSize: `${Math.max(remHeight[base] / 2, 0.75)}rem`,
});

export const inputFrameStyle = recipe({
  base: {
    ...inputSize('md'),
    backgroundColor: theme.input.bgColor,
    color: theme.input.textColor,
    alignItems: 'center',
    appearance: 'none',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.input.borderColor,
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '350',
    outline: 'none',
    justifyContent: 'center',
    padding: '0 6px',

    ':focus': {
      boxShadow: `0 0 0 3px ${theme.focusColor}`,
      zIndex: 1,
    },

    selectors: {
      '&:hover:not([disabled])': {
        borderColor: theme.input.hoverBorderColor,
      },

      '&:focus-within': {
        boxShadow: `0 0 0 2px inset ${theme.focusColor}`,
      },
    },

    vars: {
      '--icon-color': theme.input.iconColor,
    },
  },

  variants: {
    size: {
      xl: inputSize('xl'),
      lg: inputSize('lg'),
      md: inputSize('md'),
      sm: inputSize('sm'),
      xs: inputSize('xs'),
      mini: inputSize('mini'),
      tiny: inputSize('tiny'),
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

export const inputElementStyle = style({
  alignSelf: 'stretch',
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.input.textColor,
  outline: 'none',
  fontFamily: theme.font.body,
  fontSize: 'inherit',
  margin: '0 2px',
  flex: 1,

  selectors: {
    '&::selection': {
      background: theme.input.selectionBgColor,
      color: theme.input.selectionTextColor,
    },

    '&[disabled]': {
      opacity: 0.5,
    },
  },
});

export const adornStyle = style({
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
});

export const adornLeftStyle = style([
  adornStyle,
  {
    marginLeft: -2,
  },
]);

export const adornRightStyle = style([
  adornStyle,
  {
    marginRight: -2,
  },
]);

export const checkboxLabelStyle = style({
  color: theme.input.textColor,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  outline: 'none',
  fontFamily: theme.font.body,
  fontSize: 'inherit',
  flex: 1,

  selectors: {
    '&.disabled': {
      cursor: 'default',
      opacity: 0.5,
    },
  },
});

export const checkboxInnerStyle = style({
  appearance: 'none',
  backgroundColor: theme.checkbox.bgColor,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.checkbox.borderColor,
  borderRadius: 3,
  color: theme.checkbox.markColor,
  cursor: 'inherit',
  height: '18px',
  fontFamily: theme.font.body,
  fontSize: 'inherit',
  marginRight: '6px',
  outline: 'none',
  position: 'relative',
  width: '18px',

  selectors: {
    '&:focus-within': {
      boxShadow: `0 0 2px 3px ${theme.focusColor}`,
      zIndex: 1,
    },

    '&:checked': {
      backgroundColor: theme.checkbox.checkedBgColor,
      borderColor: theme.checkbox.checkedBgColor,
    },

    '&:checked::after': {
      borderColor: theme.checkbox.markColor,
      borderWidth: '0 3px 3px 0',
      borderStyle: 'solid',
      content: '',
      height: '9px',
      left: '4px',
      position: 'absolute',
      top: '0',
      transform: 'rotate(40deg)',
      width: '5px',
    },
  },
});

export const fieldValidationStyle = recipe({
  base: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.8rem',
  },

  variants: {
    status: {
      warning: {
        color: '#a80',
      },

      error: {
        color: '#c00',
      },
    },
  },
});

export const fieldMessageStyle = style({
  marginTop: 2,
});

export type InputStyleProps = RecipeVariants<typeof inputFrameStyle>;
export type FieldValidationStyleProps = RecipeVariants<typeof fieldValidationStyle>;
