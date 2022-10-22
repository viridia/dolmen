import { createStitches } from '@stitches/core';
import { colord } from 'colord';
import { palette } from './palette';

const primaryColor = '#6469ff';
const dangerColor = '#992ca9';
const textHighlight = '#afafef';

const { getCssText, css, createTheme, theme, config } = createStitches({
  prefix: 'dol',
  theme: {
    colors: {
      // Flat surfaces - page, card, modal, header
      elevation0: palette.gray100,
      elevation1: palette.gray50,
      elevation2: palette.white,

      // "Wells" are interactive regions such as input, list box, etc.
      wellBg: palette.gray150,
      wellBorder: palette.gray250,
      wellHoverBorder: palette.gray300,

      // Text colors
      text: palette.gray800,
      textDim: palette.gray500,
      textSelection: palette.gray900,
      textSelectionBg: textHighlight,

      // Colors for selected items (menus, list rows)
      itemHoverBg: palette.gray200,
      itemSelectedBg: textHighlight,

      // Various dynamic colors
      focus: '#00006633',
      shadow: colord(palette.black).alpha(0.4).toHex(),
      backdrop: colord(palette.gray900).alpha(0.3).toHex(),

      // Buttons (also used by some other controls such as checkbox and radio)
      btnPrimary: primaryColor,
      btnPrimaryText: palette.white,
      btnPrimaryTextDim: colord(primaryColor).lighten(0.2).toHex(),

      btnSecondary: palette.gray200,
      btnSecondaryContrast: palette.gray800,
      btnSecondaryContrastDim: palette.gray600,

      btnDanger: dangerColor,
      btnDangerText: palette.white,
      btnDangerTextDim: colord(dangerColor).lighten(0.3).toHex(),

      btnSelected: palette.gray700,
      btnSelectedContrast: palette.gray100,
      btnSelectedContrastDim: palette.gray200,

      // Toggle switches
      toggleFill: palette.gray150,
      toggleFillChecked: '#77dd77',
      toggleSlideFill: `linear-gradient(to bottom, ${palette.gray50} 0%, ${palette.gray200} 100%)`,

      // Tooltips have their own color scheme, also used by callouts.
      tooltipBg: palette.gray700,
      tooltipText: palette.white,

      // To migrate

      checkboxBorderColor: palette.gray500,

      knobRim: `linear-gradient(
        to bottom,
        ${colord(palette.gray100).lighten(0.1).toHex()} 0,
        ${colord(palette.gray100).toHex()} 30%,
        ${colord(palette.gray100).darken(0.1).toHex()}
      )`,
      knobCenter: `linear-gradient(
        to bottom,
        ${colord(palette.gray100).lighten(0.03).toHex()} 0,
        ${colord(palette.gray100).toHex()} 30%,
        ${colord(palette.gray100).darken(0.03).toHex()}
      )`,
      knobArc: palette.gray250,
      knobTick: palette.gray250,
      knobMark: palette.gray400,
      knobShadow: colord(palette.black).alpha(0.6).toHex(),

      scrollbar: 'rgba(0, 0, 0, 0.2)',
      scrollbarInactive: 'rgba(0, 0, 0, 0.1)',

      sliderTrack: palette.gray250,
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
      focused: 100, // Let's focus indicators float above other controls.
      sidebar: 500, // For sidebars that lie below the appbar
      appbar: 600,
      modal: 700,
      dropdown: 800,
      alert: 900,
      tooltip: 1000,
    },
  },
});

export { getCssText, css, createTheme, theme, config };

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
