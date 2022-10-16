import { css } from './css';

export const scrollbars = css({
  '&::-webkit-scrollbar': {
    backgroundColor: 'transparent',
    width: '11px',
    height: '11px',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$scrollbar',
    borderRadius: '6px',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
  },

  '&::-webkit-scrollbar-thumb:window-inactive': {
    backgroundColor: '$scrollbarInactive',
  },

  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
});
