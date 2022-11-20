import { style } from '@vanilla-extract/css';

export const canvasPaneCss = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: 8,
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
});

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
});

export const adjustPaneStyle = style({
  boxShadow: `0 0 3px 0 black`,
  alignItems: 'stretch',
  color: '#fff',
  overflowY: 'auto',
  width: 300,
  zIndex: 300,
});

export const catalogGroup = style({
  paddingLeft: '1rem',
  height: 0,
  overflowY: 'hidden',

  selectors: {
    '&.root': {
      paddingLeft: 0,
      height: 'auto',
      overflowY: 'visible',
    },

    '&.expanded': {
      height: 'auto',
    },
  },
});

export const catalogPaneCss = style({
  boxShadow: '0 0 3px 0 black',
  alignItems: 'stretch !important',
  color: '#fff',
  overflowY: 'auto',
  width: 300,
  zIndex: 800,
});

export const discloseAreaCss = style({
  width: '1.5rem',
});

export const catalogEntryStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
});

export const catalogEntryName = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '4px 8px',
  // color: palette.coolgray400,
  fontStyle: 'italic',
});

export const selectableEntryName = style({
  // color: palette.gray100,
  cursor: 'pointer',
  fontStyle: 'normal',

  ':hover': {
    // backgroundColor: palette.coolgray850,
  },

  selectors: {
    '&.selected': {
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // TODO: Replace with selected bg
    },
  },
});

export const paramGroupCss = style({
  marginTop: 6,
  marginBottom: 6,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
});

export const paramSliderCss = style({
  alignSelf: 'stretch',
  flex: 1,
});

export const paramSliderValue = style({
  width: '2rem',
  display: 'flex',
});

export const rootCss = style({
  fontSize: '14px',
});
