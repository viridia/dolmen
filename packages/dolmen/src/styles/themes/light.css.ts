import { createTheme } from '@vanilla-extract/css';
import { palette } from '../palette';
import { theme } from '../theme.css';
import { colord } from 'colord';

const primaryColor = '#6469ff';
const dangerColor = '#992ca9';
const textHighlight = '#afafff';

export const light = createTheme(theme, {
  pageColor: palette.gray[100],
  focusColor: '#00006633',
  textColor: palette.gray[800],
  shadowColor: palette.gray[400],

  scrollbarColor: 'rgba(0, 0, 0, 0.2)',
  scrollbarInactiveColor: 'rgba(0, 0, 0, 0.1)',

  pageHeaderBg: palette.gray[50],

  button: {
    default: {
      bgColor: palette.gray[200],
      textColor: palette.gray[750],
      iconColor: palette.gray[600],
      borderColor: palette.gray[300],
      hoverBgColor: palette.gray[250],
      activeBgColor: palette.gray[350],
    },
    primary: {
      bgColor: primaryColor,
      textColor: palette.white,
      iconColor: colord(primaryColor).lighten(0.2).toHex(),
      borderColor: colord(primaryColor).darken(0.05).toHex(),
      hoverBgColor: colord(primaryColor).darken(0.03).toHex(),
      activeBgColor: colord(primaryColor).darken(0.07).toHex(),
    },
    danger: {
      bgColor: dangerColor,
      textColor: palette.white,
      iconColor: colord(dangerColor).lighten(0.3).toHex(),
      borderColor: colord(dangerColor).darken(0.07).toHex(),
      hoverBgColor: colord(dangerColor).darken(0.03).toHex(),
      activeBgColor: colord(dangerColor).darken(0.07).toHex(),
    },
    selected: {
      bgColor: palette.gray[700],
      textColor: palette.gray[100],
      iconColor: palette.gray[200],
      borderColor: palette.gray[700],
      hoverBgColor: palette.gray[700],
      activeBgColor: palette.gray[700],
    },
    subtle: {
      bgColor: 'transparent',
      textColor: palette.gray[700],
      iconColor: palette.gray[450],
      borderColor: 'transparent',
      hoverBgColor: palette.gray[200],
      activeBgColor: palette.gray[300],
    },
  },

  card: {
    bgColor: palette.white,
  },

  checkbox: {
    bgColor: palette.gray[150],
    borderColor: palette.gray[500],
    checkedBgColor: primaryColor,
    markColor: palette.white,
  },

  input: {
    bgColor: palette.gray[150],
    textColor: palette.gray[800],
    iconColor: palette.gray[450],
    borderColor: palette.gray[200],
    hoverBorderColor: palette.gray[200],
    selectionBgColor: textHighlight,
    selectionTextColor: palette.gray[900],
  },

  toggleswitch: {
    bgColor: palette.gray[150],
    borderColor: palette.gray[400],
    checkedBgColor: '#77dd77',
    markBg: `linear-gradient(to bottom, ${palette.gray[50]} 0%, ${palette.gray[350]} 100%)`,
    markBorderColor: `#00000044`,
  },

  font: {
    body: '"Open Sans", Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    title: '"Open Sans", Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    mono: '"Source Code Pro", Consolas, Inconsolata, Menlo, monospace',
  },
});
