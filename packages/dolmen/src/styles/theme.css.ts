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

  pageHeaderBg: '',
  pageHeaderShadow: '',

  button: {
    primary: buttonColorContract,
    default: buttonColorContract,
    danger: buttonColorContract,
    subtle: buttonColorContract,
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

  font: {
    body: '',
    title: '',
  },
});