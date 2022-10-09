import { theme } from './theme.css';

export const scrollbars = {
  '&::-webkit-scrollbar': {
    backgroundColor: 'transparent',
    width: '11px',
    height: '11px',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.scrollbarColor,
    borderRadius: '6px',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
  },

  '&::-webkit-scrollbar-thumb:window-inactive': {
    backgroundColor: theme.scrollbarInactiveColor,
  },

  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
};
