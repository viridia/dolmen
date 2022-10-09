import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { remHeight, SizeVariant } from '../../styles/sizes';
import { theme } from '../../styles/theme.css';

export const buttonGroupStyle = style({
  display: 'flex',
  flexDirection: 'row',
});

const buttonSize = (base: SizeVariant) => ({
  height: `${remHeight[base]}rem`,
  fontSize: `${Math.max(remHeight[base] / 2, 0.75)}rem`,
  padding: `0 ${remHeight[base] / 3}rem`,
});

const buttonColor = (colorVariant: string) => ({
  backgroundColor: theme.button[colorVariant].bgColor,
  borderColor: theme.button[colorVariant].borderColor,
  color: theme.button[colorVariant].textColor,
  selectors: {
    '&:hover:not([disabled])': {
      backgroundColor: theme.button[colorVariant].hoverBgColor,
    },
    '&:active:not([disabled])': {
      backgroundColor: theme.button[colorVariant].activeBgColor,
    },
  },

  vars: {
    // The variable `--icon-color` is referenced within the SVG files for icons.
    '--icon-color': theme.button[colorVariant].textColor,
  },
});

export const buttonStyle = recipe({
  base: {
    ...buttonSize('md'),
    backgroundColor: theme.button.default.bgColor,
    color: theme.button.default.textColor,
    alignItems: 'center',
    appearance: 'none',
    borderRadius: 3,
    borderWidth: 0,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '350',
    outline: 'none',
    justifyContent: 'center',

    vars: {
      '--icon-color': theme.button.default.textColor,
    },

    ':focus': {
      boxShadow: `0 0 0 3px ${theme.focusColor}`,
      zIndex: 1,
    },

    selectors: {
      '&[disabled]': {
        opacity: 0.5,
      },

      '&:hover:not([disabled])': {
        backgroundColor: theme.button.default.hoverBgColor,
      },

      '&:active:not([disabled])': {
        backgroundColor: theme.button.default.activeBgColor,
      },

      [`${buttonGroupStyle} > &`]: {
        borderRadius: 0,
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: theme.button.default.hoverBgColor,
      },

      [`${buttonGroupStyle} > &:first-child`]: {
        borderRadius: '3px 0 0 3px',
      },

      [`${buttonGroupStyle} > &:last-child`]: {
        borderRadius: '0 3px 3px 0',
        // borderRightWidth: 0,
      },
    },
  },

  variants: {
    size: {
      xl: buttonSize('xl'),
      lg: buttonSize('lg'),
      md: buttonSize('md'),
      sm: buttonSize('sm'),
      xs: buttonSize('xs'),
      mini: buttonSize('mini'),
      tiny: buttonSize('tiny'),
    },

    color: {
      primary: buttonColor('primary'),
      default: buttonColor('default'),
      danger: buttonColor('danger'),
      subtle: buttonColor('subtle'),
    },

    round: {
      true: {
        borderRadius: '500px',
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

export type ButtonStyleProps = RecipeVariants<typeof buttonStyle>;
