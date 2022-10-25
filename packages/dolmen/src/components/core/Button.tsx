import { ParentComponent, JSX, splitProps } from 'solid-js';
import { VariantProps } from '@stitches/core';
import { css, ButtonSizeVariant, StyleProps, styleProps, Z, size, fontSize } from '../../styles';
import { buttonGroupCss } from './ButtonGroup';

const buttonSize = (base: ButtonSizeVariant) => ({
  height: size[base],
  fontSize: fontSize[base],
  padding: `0 0.7em`,
});

const buttonCss = css({
  alignItems: 'center',
  appearance: 'none',
  borderColor: 'rgba(0, 0, 0, 0.2)', // Needed for ButtonGroup
  borderRadius: 3,
  borderStyle: 'solid',
  borderWidth: 0,
  display: 'flex',
  flexDirection: 'row',
  fontWeight: '500',
  gap: '0.4rem',
  justifyContent: 'center',
  margin: 0,
  outline: 'none',

  '&:focus:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: Z.focused,
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
        color: '$btnSecondaryContrast',
        backgroundColor: '$btnSecondary',
        '&:hover:not([disabled])': {
          filter: 'contrast(85%) saturate(120%)',
        },
        '&:active:not([disabled])': {
          filter: 'brightness(0.8) contrast(110%)',
        },
        '--icon-color': '$colors$btnSecondaryContrastDim',
      },
      primary: {
        color: '$btnPrimaryText',
        backgroundColor: '$btnPrimary',
        '&:hover:not([disabled])': {
          filter: 'brightness(1.15) contrast(130%)',
        },
        '&:active:not([disabled])': {
          filter: 'brightness(1.3)',
        },
        '--icon-color': '$colors$btnPrimaryTextDim',
      },
      danger: {
        color: '$btnDangerText',
        backgroundColor: '$btnDanger',
        '&:hover:not([disabled])': {
          filter: 'brightness(1.15) contrast(130%)',
        },
        '&:active:not([disabled])': {
          filter: 'brightness(1.3)',
        },
        '--icon-color': '$colors$btnDangerTextDim',
      },
      selected: {
        backgroundColor: '$btnSelected',
        borderColor: '$btnSelected',
        color: '$btnSelectedContrast',
        '--icon-color': '$colors$btnSelectedContrastDim',
      },
      subtle: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '$btnSecondaryContrast',
        '&:hover:not([disabled])': {
          backgroundColor: '$itemHoverBg',
        },
        '&:active:not([disabled])': {
          backgroundColor: '$itemHoverBg',
          filter: 'brightness(0.9)',
        },
        '--icon-color': '$colors$btnSecondaryContrastDim',
      },
      field: {
        backgroundColor: '$fieldBg',
        borderColor: '$fieldBorderSlight',
        color: '$text',
        borderWidth: 1,
        // '&:hover:not([disabled])': {
        //   backgroundColor: '$itemHoverBg',
        // },
        // '&:active:not([disabled])': {
        //   backgroundColor: '$itemHoverBg',
        //   filter: 'brightness(0.9)',
        // },
        '--icon-color': '$colors$textDim',
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

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps &
  VariantProps<typeof buttonCss> & {
    selected?: boolean;
  };

export const Button: ParentComponent<ButtonProps> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
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
        ...layoutStyle,
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
