import { createTheme } from '@vanilla-extract/css';
import { mix } from '../../lib/mix';
import { palette } from '../palette';
import { theme } from '../theme.css';

const textHighlight = '#afafff';

export const light = createTheme(theme, {
  pageColor: palette.gray[100],
  focusColor: palette.gray[200],
  textColor: palette.gray[800],

  pageHeaderBg: palette.white,
  pageHeaderShadow: palette.gray[400],

  button: {
    primary: {
      bgColor: '#6469ff',
      textColor: palette.white,
      borderColor: mix('#6469ff', '#000000', 0.1),
      hoverBgColor: mix('#6469ff', '#000000', 0.1),
      activeBgColor: mix('#6469ff', '#000000', 0.2),
    },
    default: {
      bgColor: palette.gray[300],
      textColor: palette.gray[800],
      borderColor: mix(palette.gray[300], '#000000', 0.1),
      hoverBgColor: mix(palette.gray[300], '#000000', 0.1),
      activeBgColor: mix(palette.gray[300], '#000000', 0.2),
    },
    danger: {
      bgColor: '#992ca9',
      textColor: palette.white,
      borderColor: mix('#992ca9', '#000000', 0.1),
      hoverBgColor: mix('#992ca9', '#000000', 0.1),
      activeBgColor: mix('#992ca9', '#000000', 0.2),
    },
    subtle: {
      bgColor: 'transparent',
      textColor: palette.gray[700],
      borderColor: palette.gray[50],
      hoverBgColor: palette.gray[250],
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
