import { createStitches } from '@stitches/core';
import { colord } from 'colord';
import { palette } from './palette';
import { fontSize } from './size';

const primaryColor = '#6469ff';
const dangerColor = '#992ca9';
const textHighlight = '#afafef';

const { getCssText, css, createTheme, theme, config, globalCss } = createStitches({
  prefix: 'dm',
  theme: {
    colors: {
      // Flat surfaces - page, card, modal, header
      elevation0: palette.gray100,
      elevation1: palette.gray50,
      elevation2: palette.white,

      // "Wells" are interactive regions such as input, list box, etc.
      fieldBg: palette.gray150,
      fieldBorder: palette.gray500,
      fieldBorderSlight: palette.gray250,
      fieldHoverBorder: palette.gray300,

      // Text colors
      text: palette.gray800,
      textDim: palette.gray500,
      textSelection: palette.gray900,
      textSelectionBg: textHighlight,
      textLink: colord(primaryColor).darken(0.2).desaturate(0.3).toHex(),

      // Severities
      successText: '#040',
      successIcon: '#4a4',
      successBg: '#ddeedd',
      infoText: '#008',
      infoIcon: '#66e',
      infoBg: '#d4d4ee',
      warningText: '#640',
      warningIcon: '#a80',
      warningBg: '#eeeed4',
      errorText: '#700',
      errorIcon: '#d00',
      errorBg: '#eed5d5',

      // Colors for selected items (menus, list rows)
      itemHoverBg: palette.gray100,
      itemFocusBg: palette.gray100,
      itemSelectedText: palette.white,
      itemSelectedBg: colord(primaryColor).darken(0.3).desaturate(0.7).toHex(),

      // Various dynamic colors
      focus: '#11117733',
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

      // Scrollbars
      scrollbar: 'rgba(0, 0, 0, 0.2)',
      scrollbarInactive: 'rgba(0, 0, 0, 0.1)',

      // Slider
      sliderFill: palette.gray250,

      // Toggle switches
      toggleFill: palette.gray150,
      toggleFillChecked: '#77dd77',
      toggleSlideFill: `linear-gradient(to bottom, ${palette.gray50} 0%, ${palette.gray200} 100%)`,

      // Tooltips have their own color scheme, also used by callouts.
      tooltipBg: palette.gray700,
      tooltipText: palette.white,

      // To migrate

      knobRim: `linear-gradient(
        to bottom,
        ${colord(palette.gray100).lighten(0.1).toHex()} 0,
        ${colord(palette.gray100).darken(0.1).toHex()}
      )`,
      knobCenter: `linear-gradient(
        to bottom,
        ${colord(palette.gray100).lighten(0.03).toHex()} 0,
        ${colord(palette.gray100).darken(0.03).toHex()}
      )`,
    },

    fonts: {
      body: '"Open Sans", Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      title:
        '"Open Sans", Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      mono: '"Source Code Pro", Consolas, Inconsolata, Menlo, monospace',
    },
  },
});

export { getCssText, css, createTheme, theme, config, globalCss };

export const stdFontSizes = css({
  variants: {
    size: {
      xl: { fontSize: fontSize.xl },
      lg: { fontSize: fontSize.lg },
      md: { fontSize: fontSize.md },
      sm: { fontSize: fontSize.sm },
      xs: { fontSize: fontSize.xs },
      xxs: { fontSize: fontSize.xxs },
      xxxs: { fontSize: fontSize.xxxs },
    },
  },
});
