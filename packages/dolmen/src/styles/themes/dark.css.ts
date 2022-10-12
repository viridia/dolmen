import { createTheme } from '@vanilla-extract/css';
import { palette } from '../palette';
import { theme } from '../theme.css';
import { colord } from 'colord';

const primaryColor = '#3f45d4';
const dangerColor = '#7d248a';
const textHighlight = '#afafff66';

export const dark = createTheme(theme, {
  pageColor: palette.coolgray[900],
  focusColor: '#8183ff88',
  textColor: palette.coolgray[200],
  shadowColor: palette.black,

  scrollbarColor: 'rgba(255, 255, 255, 0.3)',
  scrollbarInactiveColor: 'rgba(255, 255, 255, 0.15)',

  pageHeaderBg: palette.coolgray[850],

  button: {
    primary: {
      bgColor: primaryColor,
      textColor: palette.coolgray[100],
      iconColor: colord(primaryColor).lighten(0.25).toHex(),
      borderColor: colord(primaryColor).darken(0.1).toHex(),
      hoverBgColor: colord(primaryColor).darken(0.05).toHex(),
      activeBgColor: colord(primaryColor).darken(0.1).toHex(),
    },
    default: {
      bgColor: palette.coolgray[800],
      textColor: palette.coolgray[200],
      iconColor: palette.coolgray[500],
      borderColor: palette.coolgray[900],
      hoverBgColor: palette.coolgray[750],
      activeBgColor: palette.coolgray[700],
    },
    danger: {
      bgColor: dangerColor,
      textColor: palette.coolgray[100],
      iconColor: colord(dangerColor).lighten(0.3).toHex(),
      borderColor: colord(dangerColor).darken(0.1).toHex(),
      hoverBgColor: colord(dangerColor).darken(0.05).toHex(),
      activeBgColor: colord(dangerColor).darken(0.1).toHex(),
    },
    subtle: {
      bgColor: 'transparent',
      textColor: palette.coolgray[200],
      iconColor: palette.coolgray[550],
      borderColor: 'transparent',
      hoverBgColor: palette.coolgray[800],
      activeBgColor: palette.coolgray[750],
    },
  },

  card: {
    bgColor: palette.coolgray[850],
  },

  checkbox: {
    bgColor: palette.gray[800],
    borderColor: palette.gray[700],
    checkedBgColor: primaryColor,
    markColor: palette.white,
  },

  input: {
    bgColor: colord(palette.coolgray[850]).darken(0.025).toHex(),
    textColor: palette.coolgray[200],
    iconColor: palette.coolgray[550],
    borderColor: palette.coolgray[750],
    hoverBorderColor: palette.coolgray[650],
    selectionBgColor: textHighlight,
    selectionTextColor: palette.white,
  },

  toggleswitch: {
    bgColor: palette.coolgray[800],
    borderColor: palette.coolgray[650],
    checkedBgColor: '#118811',
    markBg: `linear-gradient(to bottom, ${palette.gray[100]} 0%, ${palette.gray[550]} 100%)`,
    markBorderColor: `#00000088`,
  },

  font: {
    body: 'Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    title: 'Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    mono: '"Source Code Pro", Consolas, Inconsolata, Menlo, monospace',
  },
});
