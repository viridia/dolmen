import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme.css';

export const discloseButtonStyle = style({
  alignItems: 'center',
  appearance: 'none',
  aspectRatio: 1,
  backgroundColor: 'transparent',
  borderColor: theme.button.subtle.borderColor,
  borderRadius: 3,
  borderWidth: 0,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'row',
  fontWeight: '500',
  gap: '0.4rem',
  height: '1.5rem',
  justifyContent: 'center',
  outline: 'none',
  padding: 0,
  transform: 'rotate(-90deg)',
  transition: 'transform 0.5s ease',
  width: '1.5rem',

  vars: {
    '--icon-color': theme.button.subtle.iconColor,
  },

  selectors: {
    '&.selected': {
      transform: 'rotate(0)',
    },

    '&:focus:focus-visible': {
      boxShadow: `0 0 1px 3px ${theme.focusColor}`,
      zIndex: 1,
    },

    '&[disabled]': {
      opacity: 0.5,
    },

    '&:hover:not([disabled])': {
      vars: {
        '--icon-color': theme.button.subtle.textColor,
      },
    },
  },
});
