import { createStitches } from '@stitches/core';
import { colord } from 'colord';
import { palette } from './palette';

const primaryColor = '#6469ff';
const dangerColor = '#992ca9';
const textHighlight = '#afafff';

const { getCssText, css, createTheme, config } = createStitches({
  prefix: 'dol',
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',

      background: palette.gray[100],
      backdrop: colord(palette.gray[900]).alpha(0.3).toHex(),
      surface: palette.gray[50],
      focus: '#00006633',
      text: palette.gray[800],
      shadow: palette.gray[400],

      primary: primaryColor,
      primaryHover: colord(primaryColor).darken(0.03).toHex(),
      primaryActive: colord(primaryColor).darken(0.07).toHex(),
      primaryContrast: '$white',
      primaryContrastDim: colord(primaryColor).lighten(0.2).toHex(),
      primaryDivider: colord(primaryColor).darken(0.05).toHex(),

      secondary: palette.gray[200],
      secondaryHover: palette.gray[250],
      secondaryActive: palette.gray[350],
      secondaryContrast: palette.gray[750],
      secondaryContrastDim: palette.gray[600],
      secondaryDivider: palette.gray[300],

      danger: dangerColor,
      dangerHover: colord(dangerColor).darken(0.03).toHex(),
      dangerActive: colord(dangerColor).darken(0.07).toHex(),
      dangerContrast: '$white',
      dangerContrastDim: colord(dangerColor).lighten(0.3).toHex(),
      dangerDivider: colord(dangerColor).darken(0.07).toHex(),

      selected: palette.gray[700],
      selectedContrast: palette.gray[100],
      selectedContrastDim: palette.gray[200],

      subtleHover: palette.gray[200],
      subtleActive: palette.gray[300],

      scrollbar: 'rgba(0, 0, 0, 0.2)',
      scrollbarInactive: 'rgba(0, 0, 0, 0.1)',

      checkboxFill: palette.gray[150],
      checkboxFillChecked: primaryColor,
      checkboxBorderColor: palette.gray[500],
      checkboxMark: '$white',

      inputBg: palette.gray[150],
      inputText: palette.gray[800],
      inputIcon: palette.gray[450],
      inputBorder: palette.gray[200],
      inputBorderHover: palette.gray[200],
      inputSelectionBg: textHighlight,
      inputSelectionText: palette.gray[900],

      knobRim: `linear-gradient(
        to bottom,
        ${colord(palette.gray[100]).lighten(0.1).toHex()} 0,
        ${colord(palette.gray[100]).toHex()} 30%,
        ${colord(palette.gray[100]).darken(0.1).toHex()}
      )`,
      knobCenter: `linear-gradient(
        to bottom,
        ${colord(palette.gray[100]).lighten(0.03).toHex()} 0,
        ${colord(palette.gray[100]).toHex()} 30%,
        ${colord(palette.gray[100]).darken(0.03).toHex()}
      )`,
      knobArc: palette.gray[250],
      knobTick: palette.gray[250],
      knobMark: palette.gray[400],
      knobShadow: colord(palette.black).alpha(0.6).toHex(),

      modalBg: '$surface',
      modalShadow: colord(palette.black).alpha(0.4).toHex(),
      modalHeader: palette.gray[50],
      modalDivider: palette.gray[150],

      splitterFill: palette.gray[50],
      splitterShadow: palette.gray[750],
      splitterDetail: palette.gray[200],

      toggleFill: palette.gray[150],
      toggleFillChecked: '#77dd77',
      toggleBorder: palette.gray[250],
      toggleSlideFill: `linear-gradient(to bottom, ${palette.gray[50]} 0%, ${palette.gray[200]} 100%)`,
      toggleSlideBorder: `#00000044`,
    },

    fonts: {
      body: '"Open Sans", Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      title:
        '"Open Sans", Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      mono: '"Source Code Pro", Consolas, Inconsolata, Menlo, monospace',
    },

    fontSizes: {
      xl: '1.25rem',
      lg: '1.1rem',
      md: '1rem',
      sm: '0.95rem',
      xs: '0.85rem',
      mini: '0.8rem',
      tiny: '0.75rem',
    },

    space: {
      xl: '12px',
      lg: '8px',
      md: '4px',
      sm: '2px',
      xs: '1px',
      none: '0',
    },

    sizes: {
      xl: '2.5rem',
      lg: '2.2rem',
      md: '2rem',
      sm: '1.85rem',
      xs: '1.65rem',
      mini: '1.45rem',
      tiny: '1.3rem',
    },

    zIndices: {
      ground: 0,
      focused: 100,
      drawer: 700,
      pageHeader: 750,
      modal: 800,
      dropdown: 900,
      alert: 950,
      tooltip: 1000,
    },
  },

  utils: {
    gap: (value: Spacings) => ({
      gap: value,
    }),
  },
});

export { getCssText, css, createTheme };
export type FontSizes = keyof typeof config.theme.fontSizes;
export type SizeVariant = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ButtonSizeVariant = SizeVariant | 'mini' | 'tiny';
export type Spacings = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'none';

export const stdFontSizes = css({
  variants: {
    size: {
      xl: { fontSize: '$xl' },
      lg: { fontSize: '$lg' },
      md: { fontSize: '$md' },
      sm: { fontSize: '$sm' },
      xs: { fontSize: '$xs' },
      mini: { fontSize: '$mini' },
      tiny: { fontSize: '$tiny' },
    },
  },
});
