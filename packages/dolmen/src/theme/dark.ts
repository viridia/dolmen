import { colord } from 'colord';
import { palette } from '../styles';
import { createTheme } from '../styles/css';

const primaryColor = '#3f45d4';
const dangerColor = '#7d248a';
const textHighlight = '#6f6fcf66';

export const dark = createTheme('dark', {
  colors: {
    elevation0: palette.coolgray900,
    elevation1: palette.coolgray850,
    elevation2: palette.coolgray800,

    fieldBg: palette.coolgray800,
    fieldBorder: palette.coolgray600,
    fieldBorderSlight: palette.coolgray700,
    fieldHoverBorder: palette.coolgray600,

    text: palette.coolgray200,
    textDim: palette.coolgray500,
    textSelection: palette.white,
    textSelectionBg: textHighlight,
    textLink: colord(primaryColor).lighten(0.15).toHex(),

    successText: '#aea',
    successIcon: '#4a4',
    successBg: '#223322',
    infoText: '#aae',
    infoIcon: '#66e',
    infoBg: '#333355',
    warningText: '#eea',
    warningIcon: '#a80',
    warningBg: '#333322',
    errorText: '#e99',
    errorIcon: '#d00',
    errorBg: '#332222',

    itemHoverBg: palette.coolgray750,
    itemFocusBg: palette.coolgray700,
    itemSelectedText: palette.white,
    itemSelectedBg: primaryColor,

    focus: '#8183ff88',
    shadow: palette.black,
    backdrop: colord(palette.black).alpha(0.3).toHex(),

    btnPrimary: primaryColor,
    btnPrimaryText: colord(primaryColor).lighten(0.4).toHex(),
    btnPrimaryTextDim: colord(primaryColor).lighten(0.25).toHex(),

    btnSecondary: palette.coolgray800,
    btnSecondaryContrast: palette.coolgray200,
    btnSecondaryContrastDim: palette.coolgray500,

    btnDanger: dangerColor,
    btnDangerText: colord(dangerColor).lighten(0.4).toHex(),
    btnDangerTextDim: colord(dangerColor).lighten(0.3).toHex(),

    btnSelected: palette.coolgray600,
    btnSelectedContrast: palette.coolgray100,
    btnSelectedContrastDim: palette.coolgray200,

    // Scrollbars
    scrollbar: colord(palette.coolgray500).alpha(0.3).toHex(),
    scrollbarInactive: colord(palette.coolgray500).alpha(0.15).toHex(),

    sliderFill: palette.coolgray750,

    toggleFill: palette.coolgray700,
    toggleFillChecked: '#118811',
    toggleSlideFill: `linear-gradient(to bottom, ${palette.coolgray100} 0%, ${palette.coolgray300} 100%)`,

    tooltipBg: palette.black,
    tooltipText: palette.coolgray300,

    // To migrate

    knobRim: `linear-gradient(
      to bottom,
      ${colord(palette.coolgray800).lighten(0.1).toHex()} 0,
      ${colord(palette.coolgray800).darken(0.1).toHex()}
    )`,
    knobCenter: `linear-gradient(
      to bottom,
      ${colord(palette.coolgray800).lighten(0.03).toHex()} 0,
      ${colord(palette.coolgray800).darken(0.03).toHex()}
    )`,
  },
});
