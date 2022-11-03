import { colord } from 'colord';
import { For, VoidComponent } from 'solid-js';
import { Group } from '../../components';
import { colorKeys, css, palette } from '../../styles';

export const swatchStyle = css({
  width: 96,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});

export const nameStyle = css({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  padding: 8,
});

export const $category = 'styling';

const Swatch: VoidComponent<{ color: string; key?: number }> = props => {
  const c = colord(props.color);
  const color = c.isLight() ? '#000' : '#fff';
  return (
    <div class={swatchStyle()} style={{ 'background-color': props.color, color: color }}>
      {props.key}
    </div>
  );
};

const Palette: VoidComponent<{ name: string }> = props => {
  return (
    <div>
      <div class={nameStyle()}>{props.name}</div>
      <For each={colorKeys}>
        {key => (
          <Swatch color={(palette as Record<string, string>)[`${props.name}${key}`]} key={key} />
        )}
      </For>
    </div>
  );
};

function Palettes() {
  return (
    <Group gap="lg" alignItems="start">
      <Palette name="gray" />
      <Palette name="coolgray" />
      <Palette name="warmgray" />
      <div>
        <div class={nameStyle()}>white</div>
        <Swatch color="#ffffff" />
      </div>
      <div>
        <div class={nameStyle()}>black</div>
        <Swatch color="#000000" />
      </div>
    </Group>
  );
}

export default () => <Palettes />;
