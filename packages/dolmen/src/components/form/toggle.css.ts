import { style } from '@vanilla-extract/css';
import { Z } from '../../styles';
import { theme } from '../../styles/theme.css';

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
    '&:focus-within:focus-visible': {
      boxShadow: `0 0 1px 3px ${theme.focusColor}, inset 0 1px 3px 1px #000000cc`,
      zIndex: Z.Focused,
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
