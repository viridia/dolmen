import { VariantProps } from '@stitches/core';
import { colord } from 'colord';
import { VoidComponent } from 'solid-js';
import { css, SizeVariant, Z } from '../../styles';

const swatchSize: Record<SizeVariant, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

const colorSwatchCss = css({
  '@layer ui-base': {
    minWidth: 8,
    minHeight: 8,
  },

  variants: {
    w: {
      xs: { width: swatchSize.xs },
      sm: { width: swatchSize.sm },
      md: { width: swatchSize.md },
      lg: { width: swatchSize.lg },
      xl: { width: swatchSize.xl },
    },

    h: {
      xs: { height: swatchSize.xs },
      sm: { height: swatchSize.sm },
      md: { height: swatchSize.md },
      lg: { height: swatchSize.lg },
      xl: { height: swatchSize.xl },
    },
  },
});

const colorSwatchClickableCss = css(colorSwatchCss, {
  appearance: 'none',
  outline: 'none',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: 'black',
  cursor: 'pointer',
  padding: 0,

  '&:focus:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: Z.focused,
  },

  '&.selected': {
    borderWidth: '2px',
  },
});

interface Props {
  color: string;
  onClick?: (color: string) => void;
  selected?: boolean;
  classList?: Record<string, boolean>;
  size?: SizeVariant;
}

export const ColorSwatch: VoidComponent<Props & VariantProps<typeof colorSwatchCss>> = props => {
  const c = colord(props.color);
  const contrastingColor = c.isLight() ? '#000' : '#fff'; // Compute contrasting color.
  return props.onClick ? (
    <button
      style={{
        'background-color': props.color,
        color: contrastingColor,
        'border-color': contrastingColor,
      }}
      classList={{
        ...props.classList,
        [colorSwatchClickableCss({
          w: props.w ?? props.size,
          h: props.h ?? props.size,
        })]: true,
        selected: props.selected,
      }}
      onClick={() => props.onClick?.(props.color)}
    />
  ) : (
    <div
      style={{
        'background-color': props.color,
        color: contrastingColor,
        'border-color': contrastingColor,
      }}
      classList={{
        ...props.classList,
        [colorSwatchCss({
          w: props.w ?? props.size,
          h: props.h ?? props.size,
        })]: true,
      }}
    />
  );
};
