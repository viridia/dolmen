import { CSSProperties, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { SizeVariant } from '../../styles';
import { theme } from '../../styles/theme.css';

const knobSizes: Record<SizeVariant, number> = {
  xl: 64,
  lg: 48,
  md: 40,
  sm: 32,
  xs: 24,
};

const knobSize: (size: SizeVariant) => CSSProperties = size => ({
  height: `${knobSizes[size]}px`,
  width: `${knobSizes[size]}px`,
});

export const knobStyle = recipe({
  base: {
    position: 'relative',
    padding: '16px',
    margin: '4px 0',
    userSelect: 'none',
  },
});

export const knobArcStyle = recipe({
  base: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    border: `2px solid ${theme.knob.tickColor}`,
    borderRadius: '50%',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 50%, 0 100%)',
  },

  variants: {
    arc: {
      in: {
        left: '9px',
        top: '9px',
        right: '9px',
        bottom: '9px',
      },

      out: {},

      none: {},
    },
  },
});

export const knobTickStyle = style({
  position: 'absolute',
  left: '50%',
  top: 0,
  width: '1px',
  bottom: '50%',
  borderTopColor: theme.knob.tickColor,
  borderTopStyle: 'solid',
  borderTopWidth: '10px',
  transform: 'rotate(var(--rotation))',
  transformOrigin: '0 100%',
});

export const knobTickSmallStyle = recipe({
  base: {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: '1px',
    bottom: '50%',
    borderTopColor: theme.knob.tickColor,
    borderTopStyle: 'solid',
    borderTopWidth: '6px',
    transform: 'rotate(var(--rotation))',
    transformOrigin: '0 100%',
  },

  variants: {
    arc: {
      in: {},

      out: {},
      none: {},
    },
  },
});

export const knobPotRimStyle = recipe({
  base: {
    border: `1px solid ${theme.knob.borderColor}`,
    borderRadius: '50%',
    background: theme.knob.rimBg,
    boxShadow: `0 2px 8px ${theme.knob.shadowColor}`,
    cursor: 'pointer',
    height: '48px',
    position: 'relative',
    width: '48px',
  },

  variants: {
    size: {
      xl: knobSize('xl'),
      lg: knobSize('lg'),
      md: knobSize('md'),
      sm: knobSize('sm'),
      xs: knobSize('xs'),
    },
  },
});

export const knobPotCenterStyle = style({
  position: 'absolute',
  left: '1px',
  top: '1px',
  right: '1px',
  bottom: '1px',
  background: theme.knob.centerBg,
  borderRadius: '50%',
});

export const knobRotatorStyle = style({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  transform: 'rotate(var(--rotation))',
});

export const knobPotMarkStyle = style({
  backgroundColor: theme.knob.markColor,
  borderRadius: '1px',
  width: '3px',
  height: '20%',
  position: 'absolute',
  left: 'calc(50% - 1.5px)',
  top: '2px',
});

// export const knobTitleStyle = style({
//   color: 'var(--detail-bright-color)',
//   fontSize: '12px',
// });

// export const knobInputStyle = style({
//   backgroundColor: 'rgb(69, 58, 58)',
//   border: '1px solid rgb(37, 31, 31)',
//   borderRadius: '3px',
//   color: 'var(--detail-bright-color)',
//   fontSize: '12px',
//   width: '4rem',
//   padding: '1px 0',
//   textAlign: 'center',
//   outline: 'none',
// });

// .KnobInput:focus {
//   box-shadow: '0 0 0 3px rgb(105, 87, 87)',
// }
