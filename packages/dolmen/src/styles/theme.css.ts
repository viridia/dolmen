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
  pageColor: '',
  focusColor: '',
  textColor: '',
  shadowColor: '',

  scrollbarColor: '',
  scrollbarInactiveColor: '',

  pageHeaderBg: '',

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

  card: {
    bgColor: '',
  },

  checkbox: {
    bgColor: '',
    borderColor: '',
    checkedBgColor: '',
    markColor: '',
  },

  modal: {
    bgColor: '',
    backdropColor: '',
    shadowColor: '',
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
