export const sizeRem = {
  xl: 1.25,
  lg: 1.1,
  md: 1,
  sm: 0.9,
  xs: 0.825,
  x2s: 0.75,
  x3s: 0.65,
};

export const fontSizeRem = {
  xl: sizeRem.xl,
  lg: sizeRem.lg,
  md: sizeRem.md,
  sm: sizeRem.sm,
  xs: sizeRem.xs,
  xxs: sizeRem.x2s * 1.1,
  xxxs: sizeRem.x3s * 1.2,
};

export const fontSize = {
  xl: `${fontSizeRem.xl}rem`,
  lg: `${fontSizeRem.lg}rem`,
  md: `${fontSizeRem.md}rem`,
  sm: `${fontSizeRem.sm}rem`,
  xs: `${fontSizeRem.xs}rem`,
  xxs: `${fontSizeRem.xxs}rem`,
  xxxs: `${fontSizeRem.xxxs}rem`,
};

export const size = {
  xl: '2.5rem',
  lg: '2.2rem',
  md: '2rem',
  sm: '1.85rem',
  xs: '1.65rem',
  xxs: '1.45rem',
  xxxs: '1.3rem',
};

export const space = {
  xl: '12px',
  lg: '8px',
  md: '4px',
  sm: '2px',
  xs: '1px',
  none: '0',
};

export type SizeVariant = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ButtonSizeVariant = SizeVariant | 'xxs' | 'xxxs';
export type Space = keyof typeof space;
