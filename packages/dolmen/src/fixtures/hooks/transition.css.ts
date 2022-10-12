import { style } from '@vanilla-extract/css';

export const transitionStyle = style({
  backgroundColor: 'gray',
  height: '3rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',

  selectors: {
    '&.enter-start': {
      backgroundColor: 'red',
    },

    '&.entering': {
      backgroundColor: 'orange',
    },

    '&.entered': {
      backgroundColor: 'yellow',
    },

    '&.exit-start': {
      backgroundColor: 'lime',
    },

    '&.exiting': {
      backgroundColor: 'green',
    },

    '&.exited': {
      backgroundColor: 'blue',
    },
  },
});
