import { colord } from 'colord';
import { VoidComponent } from 'solid-js';
import { css, StyleProps, styleProps, Z } from '../../styles';

const colorSwatchCss = css({
  minWidth: 16,
  minHeight: 16,
});

const colorSwatchClickableCss = css(colorSwatchCss, {
  appearance: 'none',
  outline: 'none',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: 'black',
  cursor: 'pointer',

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
  const color = c.brightness() > 0.3 ? '#000' : '#fff'; // Compute contrasting color.
  return props.onClick ? (
    <button
      style={{ 'background-color': nprops.color, color, 'border-color': color }}
      classList={{
        ...layoutCss,
        [colorSwatchClickableCss()]: true,
        selected: props.selected,
      }}
      onClick={() => props.onClick?.(nprops.color)}
    />
  ) : (
    <div
      style={{ ...layoutCss, 'background-color': props.color, color, 'border-color': color }}
      class={colorSwatchCss()}
    />
  );
};
