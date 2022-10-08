/** Rem-sizes for standard widget size variants. */
export const remHeight = {
  xl: 2.5,
  lg: 2.2,
  md: 2,
  sm: 1.85,
  xs: 1.65,
  mini: 1.45,
  tiny: 1.3,
};

/** Standard spacings. */
export const spacing = {
  xl: '12px',
  lg: '8px',
  md: '4px',
  sm: '2px',
  xs: '1px',
};

export type SizeVariant = keyof typeof remHeight;
export type Spacing = keyof typeof spacing;
