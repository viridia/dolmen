import { style } from '@vanilla-extract/css';
import { palette, theme } from 'dolmen';

export const catalogPaneStyle = style({
  backgroundColor: theme.pageColor,
  alignItems: 'stretch',
  color: theme.textColor,
  width: 300,
});

export const catalogRootGroup = style({
  paddingLeft: '1rem',
});

export const catalogGroup = style({
  paddingLeft: '1rem',
});

export const catalogEntryStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
});

export const catalogEntryName = style({
  display: 'flex',
  justifyContent: 'start',
  padding: '4px 8px',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: palette.coolgray[850],
  },

  selectors: {
    '&.selected': {
      fontWeight: 'bold',
    },
  },
});
