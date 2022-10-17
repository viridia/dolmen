import { colord } from 'colord';
import { palette } from '../styles';
import { createTheme } from '../styles/css';

const primaryColor = '#3f45d4';
const dangerColor = '#7d248a';
const textHighlight = '#6f6fff66';

export const dark = createTheme('dark', {
  colors: {
    background: palette.coolgray[900],
    backdrop: colord(palette.black).alpha(.3).toHex(),
    surface: palette.coolgray[850],
    focus: '#8183ff88',
    text: palette.coolgray[200],
    shadow: palette.black,

    primary: primaryColor,
    primaryHover: colord(primaryColor).darken(0.05).toHex(),
    primaryActive: colord(primaryColor).darken(0.1).toHex(),
    primaryContrast: palette.coolgray[100],
    primaryContrastDim: colord(primaryColor).lighten(0.25).toHex(),
    primaryDivider: colord(primaryColor).darken(0.1).toHex(),

    secondary: palette.coolgray[800],
    secondaryHover: palette.coolgray[750],
    secondaryActive: palette.coolgray[700],
    secondaryContrast: palette.coolgray[200],
    secondaryContrastDim: palette.coolgray[500],
    secondaryDivider: palette.coolgray[900],

    danger: dangerColor,
    dangerHover: colord(dangerColor).darken(0.05).toHex(),
    dangerActive: colord(dangerColor).darken(0.1).toHex(),
    dangerContrast: palette.coolgray[100],
    dangerContrastDim: colord(dangerColor).lighten(0.3).toHex(),
    dangerDivider: colord(dangerColor).darken(0.1).toHex(),

    selected: palette.coolgray[600],
    selectedContrast: palette.coolgray[100],
    selectedContrastDim: palette.coolgray[200],

    subtleHover: palette.coolgray[800],
    subtleActive: palette.coolgray[750],

    checkboxFill: palette.coolgray[800],
    checkboxFillChecked: primaryColor,
    checkboxBorderColor: palette.coolgray[700],
    checkboxMark: '$white',

    inputBg: colord(palette.coolgray[850]).darken(0.025).toHex(),
    inputText: palette.coolgray[200],
    inputIcon: palette.coolgray[550],
    inputBorder: palette.coolgray[750],
    inputBorderHover: palette.coolgray[650],
    inputSelectionBg: textHighlight,
    inputSelectionText: '$white',

    knobRim: `linear-gradient(
      to bottom,
      ${colord(palette.coolgray[800]).lighten(0.1).toHex()} 0,
      ${colord(palette.coolgray[800]).toHex()} 30%,
      ${colord(palette.coolgray[800]).darken(0.1).toHex()}
    )`,
    knobCenter: `linear-gradient(
      to bottom,
      ${colord(palette.coolgray[800]).lighten(0.03).toHex()} 0,
      ${colord(palette.coolgray[800]).toHex()} 30%,
      ${colord(palette.coolgray[800]).darken(0.03).toHex()}
    )`,
    knobArc: palette.coolgray[750],
    knobTick: palette.coolgray[750],
    knobMark: palette.coolgray[600],
    knobShadow: colord(palette.black).alpha(0.4).toHex(),

    modalBg: palette.coolgray[850],
    modalShadow: colord(palette.black).alpha(.1).toHex(),
    modalHeader: palette.coolgray[800],
    modalDivider: palette.coolgray[900],

    scrollbar: colord(palette.coolgray[500]).alpha(0.3).toHex(),
    scrollbarInactive: colord(palette.coolgray[500]).alpha(0.15).toHex(),

    splitterFill: palette.coolgray[800],
    splitterShadow: palette.black,
    splitterDetail: palette.coolgray[600],

    toggleFill: palette.coolgray[800],
    toggleFillChecked: '#118811',
    toggleBorder: palette.coolgray[650],
    toggleSlideFill: `linear-gradient(to bottom, ${palette.coolgray[100]} 0%, ${palette.coolgray[300]} 100%)`,
    toggleSlideBorder: '#00000088',
  },
});
