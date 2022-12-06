import { colord } from 'colord';
import { VoidComponent } from 'solid-js';
import { SizeVariant } from '../../styles';

interface Props {
  color: string;
  onClick?: (color: string) => void;
  selected?: boolean;
  classList?: Record<string, boolean>;
  size?: SizeVariant;
  w?: SizeVariant;
  h?: SizeVariant;
}

export const ColorSwatch: VoidComponent<Props> = props => {
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
        'dm-color-swatch-ctrl': true,
        [`dm-w-${props.w ?? props.size}`]: Boolean(props.w ?? props.size),
        [`dm-h-${props.h ?? props.size}`]: Boolean(props.h ?? props.size),
        selected: props.selected,
      }}
      aria-selected={props.selected || undefined}
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
        'dm-color-swatch': true,
        [`dm-w-${props.w ?? props.size}`]: Boolean(props.w ?? props.size),
        [`dm-h-${props.h ?? props.size}`]: Boolean(props.h ?? props.size),
        selected: props.selected,
      }}
      aria-selected={props.selected || undefined}
    />
  );
};
