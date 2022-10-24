export const Z = {
  ground: 0,
  focused: 100, // Let's focus indicators float above other controls.
  sidebar: 500, // For sidebars that lie below the appbar
  appbar: 600,
  modal: 700,
  dropdown: 800,
  alert: 900,
  tooltip: 1000,
};

export type ZIndices = keyof typeof Z;
