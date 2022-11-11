import { colord } from 'colord';
import { VoidComponent } from 'solid-js';
import { css, StyleProps, styleProps, Z } from '../../styles';

const colorSwatchCss = css({
  minWidth: 8,
  minHeight: 8,
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
}

export const ColorSwatch: VoidComponent<Props & StyleProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const c = colord(nprops.color);
  const contrastingColor = c.isLight() ? '#000' : '#fff'; // Compute contrasting color.
  return props.onClick ? (
    <button
      style={{
        'background-color': nprops.color,
        color: contrastingColor,
        'border-color': contrastingColor,
      }}
      classList={{
        ...layoutCss,
        [colorSwatchClickableCss()]: true,
        selected: props.selected,
      }}
      onClick={() => props.onClick?.(nprops.color)}
    />
  ) : (
    <div
      style={{
        'background-color': props.color,
        color: contrastingColor,
        'border-color': contrastingColor,
      }}
      classList={{
        ...layoutCss,
        [colorSwatchCss()]: true,
      }}
    />
  );
};
