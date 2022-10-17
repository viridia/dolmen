import { ParentComponent, JSX, splitProps } from 'solid-js';
import { VariantProps } from '@stitches/core';
import { css, ButtonSizeVariant } from '../../styles';
import { buttonGroupCss } from './ButtonGroup';

const buttonSize = (base: ButtonSizeVariant) => ({
  height: `$sizes$${base}`,
  fontSize: `$fontSizes$${base}`,
  padding: `0 0.7em`,
});

const buttonCss = css({
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 3,
  borderWidth: 0,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'row',
  fontWeight: '500',
  gap: '0.4rem',
  outline: 'none',
  justifyContent: 'center',

  '&:focus:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: '$focused',
  },

  '&[disabled]': {
    opacity: 0.5,
  },

  // Button groups

  [`.${buttonGroupCss} > &`]: {
    borderRadius: 0,
    borderRightWidth: 1,
    borderRightStyle: 'solid',
  },

  [`.${buttonGroupCss} > &:first-child`]: {
    borderRadius: '3px 0 0 3px',
  },

  [`.${buttonGroupCss} > &:last-child`]: {
    borderRadius: '0 3px 3px 0',
    borderRightWidth: 0,
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
      default: {
        color: '$secondaryContrast',
        borderColor: '$secondaryDivider',
        backgroundColor: '$secondary',
        '&:hover:not([disabled])': {
          backgroundColor: '$secondaryHover',
        },
        '&:active:not([disabled])': {
          backgroundColor: '$secondaryActive',
        },
        '--icon-color': '$colors$secondaryContrastDim',
      },
      primary: {
        color: '$primaryContrast',
        borderColor: '$primaryDivider',
        backgroundColor: '$primary',
        '&:hover:not([disabled])': {
          backgroundColor: '$primaryHover',
        },
        '&:active:not([disabled])': {
          backgroundColor: '$primaryActive',
        },
        '--icon-color': '$colors$primaryContrastDim',
      },
      danger: {
        color: '$dangerContrast',
        borderColor: '$dangerDivider',
        backgroundColor: '$danger',
        '&:hover:not([disabled])': {
          backgroundColor: '$dangerHover',
        },
        '&:active:not([disabled])': {
          backgroundColor: '$dangerActive',
        },
        '--icon-color': '$colors$dangerContrastDim',
      },
      selected: {
        backgroundColor: '$selected',
        borderColor: '$secondaryDivider',
        color: '$selectedContrast',
        '--icon-color': '$colors$selectedContrastDim',
      },
      subtle: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '$secondaryContrast',
        '&:hover:not([disabled])': {
          backgroundColor: '$subtleHover',
        },
        '&:active:not([disabled])': {
          backgroundColor: '$subtleActive',
        },
        '--icon-color': '$colors$secondaryContrastDim',
      },
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

  compoundVariants: [
    {
      round: true,
      icon: true,
      css: {
        padding: 0,
      },
    },
  ],

  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Button: ParentComponent<ButtonProps & VariantProps<typeof buttonCss>> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'color',
    'round',
    'icon',
    'selected',
    'class',
    'classList',
    'children',
  ]);
  return (
    <button
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [buttonCss({
          size: local.size,
          round: local.round,
          icon: local.icon,
          color: local.selected ? 'selected' : local.color,
        })]: true,
      }}
    >
      {local.children}
    </button>
  );
};
