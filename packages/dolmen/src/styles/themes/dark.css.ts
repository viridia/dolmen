import { createTheme } from '@vanilla-extract/css';
import { palette } from '../palette';
import { theme } from '../theme.css';

export const dark = createTheme(theme, {
  pageColor: palette.coolgray[900],
  focusColor: '',
  textColor: palette.gray[200],

  pageHeaderBg: '',
  pageHeaderShadow: '',

  button: {
    primary: {
      bgColor: palette.gray[200],
      textColor: palette.gray[900],
      borderColor: palette.gray[300],
      hoverBgColor: palette.gray[300],
      activeBgColor: palette.gray[400],
    },
    default: {
      bgColor: palette.gray[200],
      textColor: palette.gray[900],
      borderColor: palette.gray[300],
      hoverBgColor: palette.gray[300],
      activeBgColor: palette.gray[400],
    },
    danger: {
      bgColor: palette.gray[200],
      textColor: palette.gray[900],
      borderColor: palette.gray[300],
      hoverBgColor: palette.gray[300],
      activeBgColor: palette.gray[400],
    },
    subtle: {
      bgColor: palette.gray[200],
      textColor: palette.gray[900],
      borderColor: palette.gray[300],
      hoverBgColor: palette.gray[300],
      activeBgColor: palette.gray[400],
    },
  },

  font: {
    body: 'Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    title: 'Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
});
