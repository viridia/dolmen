function token(token: string) {
  return {
    var: token,
    value: `var(${token})`,
  };
}

export const designTokens = {
  color: {
    // Flat surfaces - page, card, modal, header
    elevation0: token('--dm-color-elevation-0'),
    elevation1: token('--dm-color-elevation-1'),
    elevation2: token('--dm-color-elevation-2'),

    // "Wells" are interactive regions such as input, list box, etc.
    fieldBg: token('--dm-color-field-bg'),
    fieldBorder: token('--dm-color-field-border'),
    fieldBorderSlight: token('--dm-color-field-border-slight'),
    fieldHoverBorder: token('--dm-color-field-hover-border'),

    // Text colors
    text: token('--dm-color-text'),
    textDim: token('--dm-color-text-dim'),
    textSelection: token('--dm-color-text-selection'),
    textSelectionBg: token('--dm-color-text-selection-bg'),
    textLink: token('--dm-color-text-link'),

    // Severities
    successText: token('--dm-color-success-text'),
    successIcon: token('--dm-color-success-icon'),
    successBg: token('--dm-color-success-bg'),
    infoText: token('--dm-color-info-text'),
    infoIcon: token('--dm-color-info-icon'),
    infoBg: token('--dm-color-info-bg'),
    warningText: token('--dm-color-warning-text'),
    warningIcon: token('--dm-color-warning-icon'),
    warningBg: token('--dm-color-warning-bg'),
    errorText: token('--dm-color-error-text'),
    errorIcon: token('--dm-color-error-icon'),
    errorBg: token('--dm-color-error-bg'),

    // Colors for selected items (menus, list rows)
    itemHoverBg: token('--dm-color-item-hover-bg'),
    itemFocusBg: token('--dm-color-item-focus-bg'),
    itemSelectedText: token('--dm-color-item-selected-text'),
    itemSelectedBg: token('--dm-color-item-selected-bg'),

    // Various dynamic colors
    focus: token('--dm-color-focus'),
    shadow: token('--dm-color-shadow'),
    backdrop: token('--dm-color-backdrop'),

    btnBg: token('--dm-color-btn-bg'),

    // Buttons (also used by some other controls such as checkbox and radio)
    btnPrimary: token('--dm-color-btn-primary'),
    btnPrimaryText: token('--dm-color-btn-primary-text'),
    btnPrimaryTextDim: token('--dm-color-btn-primary-text-dim'),

    btnDanger: token('--dm-color-btn-danger'),
    btnDangerText: token('--dm-color-btn-danger-text'),
    btnDangerTextDim: token('--dm-color-btn-danger-text-dim'),

    btnSelected: token('--dm-color-btn-selected'),
    btnSelectedContrast: token('--dm-color-btn-selected-contrast'),
    btnSelectedContrastDim: token('--dm-color-btn-selected-contrast-dim'),

    // Scrollbars
    scrollbar: token('--dm-color-scrollbar'),
    scrollbarInactive: token('--dm-color-scrollbar-inactive'),

    // Slider
    sliderFill: token('--dm-color-slider-fill'),

    // Toggle switches
    toggleFill: token('--dm-color-toggle-fill'),
    toggleFillChecked: token('--dm-color-toggle-fill-checked'),
    // toggleSlideFill: linear-gradient(
    //   to bottom,
    //   #{palette.$gray50} 0%,
    //   #{palette.$gray200} 100%
    // );

    // Tooltips have their own color scheme, also used by callouts.
    tooltipBg: token('--dm-color-tooltip-bg'),
    tooltipText: token('--dm-color-tooltip-text'),
  },

  font: {
    title: token('--dm-font-title'),
    body: token('--dm-font-body'),
    mono: token('--dm-font-mono'),
  }
};

export type DesignTokens = typeof designTokens;
