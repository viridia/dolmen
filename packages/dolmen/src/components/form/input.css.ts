import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { fontSize, remHeight, SizeVariant } from '../../styles';
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
