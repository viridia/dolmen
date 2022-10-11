import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { fontSize, remHeight, SizeVariant } from '../../styles/sizes';
import { theme } from '../../styles/theme.css';

const inputSize = (base: SizeVariant) => ({
  height: `${remHeight[base]}rem`,
  fontSize: fontSize[base],
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
      boxShadow: `0 0 3px 2px ${theme.focusColor}`,
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
  color: theme.textColor,
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

export const checkboxCtrlStyle = style({
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
      boxShadow: `0 0 1px 3px ${theme.focusColor}`,
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

export const toggleSwitchLabelStyle = style({
  alignItems: 'center',
  borderRadius: '500px',
  color: theme.textColor,
  cursor: 'pointer',
  display: 'flex',
  flex: 1,
  fontFamily: theme.font.body,
  fontSize: 'inherit',
  justifyContent: 'start',
  outline: 'none',

  selectors: {
    '&.disabled': {
      cursor: 'default',
      opacity: 0.5,
    },
  },
});

export const toggleSwitchCtrlStyle = style({
  appearance: 'none',
  backgroundColor: theme.toggleswitch.bgColor,
  border: `2px solid ${theme.toggleswitch.borderColor}`,
  boxShadow: `inset 0 1px 3px 1px #000000cc`,
  borderRadius: 10,
  color: theme.checkbox.markColor,
  cursor: 'inherit',
  height: '20px',
  fontFamily: theme.font.body,
  fontSize: 'inherit',
  marginRight: '6px',
  outline: 'none',
  position: 'relative',
  transition: 'background-color 0.3s ease',
  width: '36px',

  selectors: {
    '&:focus-within': {
      boxShadow: `0 0 1px 3px ${theme.focusColor}, inset 0 1px 3px 1px #000000cc`,
      zIndex: 1,
    },

    '&:checked': {
      backgroundColor: theme.toggleswitch.checkedBgColor,
    },

    '&::after': {
      background: theme.toggleswitch.markBg,
      boxShadow: `0 0 2px 1px ${theme.toggleswitch.markBorderColor}, 0 0.5px 2px 1px ${theme.toggleswitch.markBorderColor}`,
      borderRadius: '50%',
      content: '',
      height: '12px',
      left: '2px',
      position: 'absolute',
      top: '2px',
      transition: 'transform 0.3s ease',
      width: '12px',
    },

    '&:checked::after': {
      transform: 'translateX(16px)',
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
