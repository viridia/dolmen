import { style } from '@vanilla-extract/css';
import { Z } from '../../styles';
import { theme } from '../../styles/theme.css';

export const checkboxLabelStyle = style({
  color: theme.textColor,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  outline: 'none',
  fontFamily: theme.font.body,
  fontSize: 'inherit',
  gap: '6px',

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
  marginRight: 0,
  marginLeft: 0,
  outline: 'none',
  position: 'relative',
  width: '18px',

  selectors: {
    '&:focus-within:focus-visible': {
      boxShadow: `0 0 1px 3px ${theme.focusColor}`,
      zIndex: Z.Focused,
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
