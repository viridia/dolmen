import { createThemeContract } from '@vanilla-extract/css';

const buttonColorContract = {
  bgColor: '',
  textColor: '',
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
    groupBorderColor: '',
  },

  card: {
    bgColor: '',
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
