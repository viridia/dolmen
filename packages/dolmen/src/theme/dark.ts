import { colord } from 'colord';
import { palette } from '../styles';
import { createTheme } from '../styles/css';

const primaryColor = '#3f45d4';
const dangerColor = '#7d248a';
const textHighlight = '#6f6fff66';

export const dark = createTheme('dark', {
  colors: {
    background: 'palette.coolgray900',
    backdrop: colord(palette.black).alpha(0.3).toHex(),
    surface: palette.coolgray850,
    focus: '#8183ff88',
    text: palette.coolgray200,
    textDim: palette.coolgray500,
    shadow: palette.black,

    primary: primaryColor,
    primaryHover: colord(primaryColor).darken(0.05).toHex(),
    primaryActive: colord(primaryColor).darken(0.1).toHex(),
    primarySoft: colord(primaryColor).darken(0.1).toHex(),
    primaryContrast: palette.coolgray100,
    primaryContrastDim: colord(primaryColor).lighten(0.25).toHex(),
    primaryDivider: colord(primaryColor).darken(0.1).toHex(),

    secondary: palette.coolgray800,
    secondaryHover: palette.coolgray750,
    secondaryActive: palette.coolgray700,
    secondaryContrast: palette.coolgray200,
    secondaryContrastDim: palette.coolgray500,
    secondaryDivider: palette.coolgray900,

    danger: dangerColor,
    dangerHover: colord(dangerColor).darken(0.05).toHex(),
    dangerActive: colord(dangerColor).darken(0.1).toHex(),
    dangerContrast: palette.coolgray100,
    dangerContrastDim: colord(dangerColor).lighten(0.3).toHex(),
    dangerDivider: colord(dangerColor).darken(0.1).toHex(),

    selected: palette.coolgray600,
    selectedContrast: palette.coolgray100,
    selectedContrastDim: palette.coolgray200,

    subtleHover: palette.coolgray800,
    subtleActive: palette.coolgray750,

    checkboxFill: palette.coolgray800,
    checkboxFillChecked: primaryColor,
    checkboxBorderColor: palette.coolgray700,
    checkboxMark: '$white',

    inputBg: colord(palette.coolgray850).darken(0.025).toHex(),
    inputText: palette.coolgray200,
    inputIcon: palette.coolgray500,
    inputBorder: palette.coolgray750,
    inputBorderHover: palette.coolgray600,
    inputSelectionBg: textHighlight,
    inputSelectionText: '$white',
    inputPlaceholder: '$colors$textDim',

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

    modalBg: palette.coolgray850,
    modalShadow: colord(palette.black).alpha(0.1).toHex(),
    modalHeader: palette.coolgray800,
    modalDivider: palette.coolgray900,

    scrollbar: colord(palette.coolgray500).alpha(0.3).toHex(),
    scrollbarInactive: colord(palette.coolgray500).alpha(0.15).toHex(),

    sliderThumb: '$primary',
    sliderTrack: palette.coolgray800,
    sliderBar: '$primarySoft',

    splitterFill: palette.coolgray800,
    splitterShadow: palette.black,
    splitterDetail: palette.coolgray600,

    toggleFill: palette.coolgray800,
    toggleFillChecked: '#118811',
    toggleBorder: palette.coolgray600,
    toggleSlideFill: `linear-gradient(to bottom, ${palette.coolgray100} 0%, ${palette.coolgray300} 100%)`,
    toggleSlideBorder: '#00000088',
  },
});
