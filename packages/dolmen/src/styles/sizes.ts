import { CSSProperties } from '@vanilla-extract/css';

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

export const fontSize = {
  xl: '1.25rem',
  lg: '1.1rem',
  md: '1rem',
  sm: '0.95rem',
  xs: '0.85rem',
  mini: '0.8rem',
  tiny: '0.75rem',
};

export function standardFontSizes(
  prop: keyof CSSProperties
): Record<keyof typeof fontSize, CSSProperties> {
  return {
    xl: {
      [prop]: fontSize.xl,
    },
    lg: {
      [prop]: fontSize.lg,
    },
    md: {
      [prop]: fontSize.md,
    },
    sm: {
      [prop]: fontSize.sm,
    },
    xs: {
      [prop]: fontSize.xs,
    },
    mini: {
      [prop]: fontSize.mini,
    },
    tiny: {
      [prop]: fontSize.tiny,
    },
  };
}

/** Standard spacings. */
export const spacing = {
  xl: '12px',
  lg: '8px',
  md: '4px',
  sm: '2px',
  xs: '1px',
  none: '0',
};

export function standardLength(
  prop: keyof CSSProperties
): Record<keyof typeof spacing, CSSProperties> {
  return {
    xl: {
      [prop]: spacing.xl,
    },
    lg: {
      [prop]: spacing.lg,
    },
    md: {
      [prop]: spacing.md,
    },
    sm: {
      [prop]: spacing.sm,
    },
    xs: {
      [prop]: spacing.xs,
    },
    none: {
      [prop]: 0,
    },
  };
}

export type SizeVariant = keyof typeof remHeight;
export type Spacing = keyof typeof spacing;
