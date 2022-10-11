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
  },

  button: {
    primary: buttonColorContract,
    default: buttonColorContract,
    danger: buttonColorContract,
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
