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

    wellBg: palette.coolgray800,
    wellBorder: palette.coolgray700,
    wellHoverBorder: palette.coolgray600,

    text: palette.coolgray200,
    textDim: palette.coolgray500,
    textSelection: palette.white,
    textSelectionBg: textHighlight,

    itemHoverBg: palette.coolgray750,
    itemSelectedBg: textHighlight,

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

    toggleFill: palette.coolgray700,
    toggleFillChecked: '#118811',
    toggleSlideFill: `linear-gradient(to bottom, ${palette.coolgray100} 0%, ${palette.coolgray300} 100%)`,

    tooltipBg: palette.black,
    tooltipText: palette.coolgray300,

    // To migrate

    checkboxBorderColor: palette.coolgray700,

    knobRim: `linear-gradient(
      to bottom,
      ${colord(palette.coolgray800).lighten(0.1).toHex()} 0,
      ${colord(palette.coolgray800).toHex()} 30%,
      ${colord(palette.coolgray800).darken(0.1).toHex()}
    )`,
    knobCenter: `linear-gradient(
      to bottom,
      ${colord(palette.coolgray800).lighten(0.03).toHex()} 0,
      ${colord(palette.coolgray800).toHex()} 30%,
      ${colord(palette.coolgray800).darken(0.03).toHex()}
    )`,
    knobArc: palette.coolgray700,
    knobTick: palette.coolgray700,
    knobMark: palette.coolgray600,
    knobShadow: colord(palette.black).alpha(0.4).toHex(),

    sliderTrack: palette.coolgray750,
  },
});
