export const fontSize = {
  xl: '1.25rem',
  lg: '1.1rem',
  md: '1rem',
  sm: '0.95rem',
  xs: '0.85rem',
  mini: '0.8rem',
  tiny: '0.75rem',
};

export const space = {
  xl: '12px',
  lg: '8px',
  md: '4px',
  sm: '2px',
  xs: '1px',
  none: '0',
};

export const size = {
  xl: '2.5rem',
  lg: '2.2rem',
  md: '2rem',
  sm: '1.85rem',
  xs: '1.65rem',
  mini: '1.45rem',
  tiny: '1.3rem',
};

export type FontSize = keyof typeof fontSize;
export type SizeVariant = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ButtonSizeVariant = SizeVariant | 'mini' | 'tiny';
export type Space = keyof typeof space;
