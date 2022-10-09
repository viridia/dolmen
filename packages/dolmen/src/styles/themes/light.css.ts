import { createTheme } from '@vanilla-extract/css';
import { mix } from '../../lib/mix';
import { palette } from '../palette';
import { theme } from '../theme.css';

const primaryColor = '#6469ff';
const dangerColor = '#992ca9';
const textHighlight = '#afafff';

export const light = createTheme(theme, {
  pageColor: palette.gray[100],
  focusColor: palette.gray[200],
  textColor: palette.gray[800],

  pageHeaderBg: palette.white,
  pageHeaderShadow: palette.gray[400],

  button: {
    primary: {
      bgColor: primaryColor,
      textColor: palette.white,
      borderColor: mix(primaryColor, '#000000', 0.1),
      hoverBgColor: mix(primaryColor, '#000000', 0.1),
      activeBgColor: mix(primaryColor, '#000000', 0.2),
    },
    default: {
      bgColor: palette.gray[300],
      textColor: palette.gray[800],
      borderColor: mix(palette.gray[300], '#000000', 0.1),
      hoverBgColor: mix(palette.gray[300], '#000000', 0.1),
      activeBgColor: mix(palette.gray[300], '#000000', 0.2),
    },
    danger: {
      bgColor: dangerColor,
      textColor: palette.white,
      borderColor: mix(dangerColor, '#000000', 0.1),
      hoverBgColor: mix(dangerColor, '#000000', 0.1),
      activeBgColor: mix(dangerColor, '#000000', 0.2),
    },
    subtle: {
      bgColor: 'transparent',
      textColor: palette.gray[700],
      borderColor: palette.gray[50],
      hoverBgColor: palette.gray[200],
      activeBgColor: palette.gray[300],
    },
  },

  input: {
    bgColor: palette.gray[150],
    textColor: palette.gray[800],
    iconColor: palette.gray[550],
    borderColor: palette.gray[200],
    hoverBorderColor: palette.gray[200],
    selectionBgColor: textHighlight,
    selectionTextColor: palette.gray[900],
  },

  font: {
    body: 'Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    title: 'Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
});
