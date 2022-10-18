import { style } from '@vanilla-extract/css';
import { palette, scrollbars } from 'dolmen';

export const canvasSectionStyle = style({
  flex: '1 1 0',
  minWidth: 0,
});

export const sourcePaneStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: 8,
  flex: 1,
  overflowY: 'auto',
  // selectors: scrollbars
});

export const adjustPaneStyle = style({
  boxShadow: `0 0 3px 0 black`,
  alignItems: 'stretch',
  color: '#fff',
  overflowY: 'auto',
  width: 300,
  zIndex: 300,

  // selectors: scrollbars,
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
  color: palette.coolgray400,
  fontStyle: 'italic',
});

export const selectableEntryName = style({
  color: palette.gray100,
  cursor: 'pointer',
  fontStyle: 'normal',

  ':hover': {
    backgroundColor: palette.coolgray850,
  },

  selectors: {
    '&.selected': {
      fontWeight: 'bold',
    },
  },
});
