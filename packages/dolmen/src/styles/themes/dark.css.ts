import { createTheme } from '@vanilla-extract/css';
import { mix } from '../../lib';
import { palette } from '../palette';
import { theme } from '../theme.css';

const primaryColor = '#3f45d4';
const dangerColor = '#7d248a';
const textHighlight = '#afafff';

export const dark = createTheme(theme, {
  pageColor: palette.coolgray[900],
  focusColor: '#313368',
  textColor: palette.coolgray[200],

  pageHeaderBg: palette.coolgray[850],
  pageHeaderShadow: palette.black,

  button: {
    primary: {
      bgColor: primaryColor,
      textColor: palette.coolgray[200],
      borderColor: mix(primaryColor, '#ffffff', 0.1),
      hoverBgColor: mix(primaryColor, '#ffffff', 0.1),
      activeBgColor: mix(primaryColor, '#ffffff', 0.2),
    },
    default: {
      bgColor: palette.coolgray[800],
      textColor: palette.coolgray[200],
      borderColor: palette.coolgray[750],
      hoverBgColor: palette.coolgray[750],
      activeBgColor: palette.coolgray[700],
    },
    danger: {
      bgColor: dangerColor,
      textColor: palette.coolgray[200],
      borderColor: mix(dangerColor, '#ffffff', 0.1),
      hoverBgColor: mix(dangerColor, '#ffffff', 0.1),
      activeBgColor: mix(dangerColor, '#ffffff', 0.2),
    },
    subtle: {
      bgColor: 'transparent',
      textColor: palette.coolgray[200],
      borderColor: palette.coolgray[800],
      hoverBgColor: palette.coolgray[800],
      activeBgColor: palette.coolgray[750],
    },
  },

  input: {
    bgColor: '',
    textColor: '',
    iconColor: '',
    borderColor: '',
    hoverBorderColor: '',
    selectionBgColor: '',
    selectionTextColor: '',
  },

  font: {
    body: 'Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    title: 'Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
});


//   --page-bg: #{$cg90};
//   --focus-color: #{$focusDark};

//   --navbar-bg: #{$cg80};
//   --navbar-shadow: #000;

//   --scrollbar-thumb: rgba(0, 0, 0, 0.2);
//   --scrollbar-thumb-inactive: rgba(0, 0, 0, 0.1);

//   --button-primary-bg: #{$primaryDark};
//   --button-primary-text: #{$g0};
//   --button-primary-hover-bg: #{darken($primaryDark, 5%)};
//   --button-primary-hover-text: #{$g0};
//   --button-primary-active-bg: #{darken($primaryDark, 10%)};
//   --button-primary-active-text: #{$g0};

//   --button-secondary-bg: #{$secondaryDark};
//   --button-secondary-text: #{$g0};
//   --button-secondary-hover-bg: #{darken($secondaryDark, 5%)};
//   --button-secondary-hover-text: #{$g0};
//   --button-secondary-active-bg: #{darken($secondaryDark, 10%)};
//   --button-secondary-active-text: #{$g0};

//   --button-danger-bg: #{$danger};
//   --button-danger-text: #{$g0};
//   --button-danger-hover-bg: #{darken($dangerDark, 5%)};
//   --button-danger-hover-text: #{$g0};
//   --button-danger-active-bg: #{darken($dangerDark, 10%)};
//   --button-danger-active-text: #{$g0};

//   --button-subtle-bg: transparent;
//   --button-subtle-text: #{$cg40};
//   --button-subtle-hover-bg: rgba(255, 255, 255, 0.1);
//   --button-subtle-hover-text: #{$g30};
//   --button-subtle-active-bg: rgba(255, 255, 255, 0.2);
//   --button-subtle-active-text: #{$g30};

//   --input-bg: #{$cg90};
//   --input-text: #{$cg20};
//   --input-border: #000;
//   --input-hover-border: #{$cg70};
//   --input-selection-bg: #{$textHighlight};
//   --input-selection-text: white;
//   --input-icon-color: #{$cg60};

//   --drawer-bg: #{$cg80};
//   --drawer-shadow: #000;
//   --drawer-drag-bg: #{$g30};
