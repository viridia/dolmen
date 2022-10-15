import { createThemeContract } from '@vanilla-extract/css';

const buttonColorContract = {
  bgColor: '',
  textColor: '',
  iconColor: '',
  borderColor: '',
  hoverBgColor: '',
  activeBgColor: '',
};

export const theme = createThemeContract({
  backgroundColor: '',
  surfaceColor: '',
  textColor: '',
  focusColor: '',
  shadowColor: '',

  scrollbarColor: '',
  scrollbarInactiveColor: '',

  font: {
    body: '',
    title: '',
    mono: '',
  },

  button: {
    primary: buttonColorContract,
    default: buttonColorContract,
    danger: buttonColorContract,
    selected: buttonColorContract,
    subtle: buttonColorContract,
  },

  checkbox: {
    bgColor: '',
    borderColor: '',
    checkedBgColor: '',
    markColor: '',
  },

  knob: {
    rimBg: '',
    centerBg: '',
    borderColor: '',
    tickColor: '',
    markColor: '',
    shadowColor: '',
  },

  modal: {
    bgColor: '',
    backdropColor: '',
    shadowColor: '',
    headerBgColor: '',
    headerBorderColor: '',
  },

  splitpane: {
    splitterBgColor: '',
    splitterShadowColor: '',
    splitterDetailColor: '',
  },

  toggleswitch: {
    bgColor: '',
    borderColor: '',
    checkedBgColor: '',
    markBg: '',
    markBorderColor: '',
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
});
