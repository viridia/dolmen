import { For, VoidComponent } from 'solid-js';
import { Group } from '../../components';
import { ColorSpread, css, palette } from '../../styles';

export const swatchStyle = css({
  width: 96,
  height: 32,
});

export const nameStyle = css({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  padding: 8,
});

export const $category = 'styling';

const Swatch: VoidComponent<{ color: string }> = props => {
  return <div class={swatchStyle()} style={{ 'background-color': props.color }} />;
};

function typedKeys<T extends { }>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

const Palette: VoidComponent<{ spread: ColorSpread; name: string }> = props => {
  return (
    <div>
      <div class={nameStyle()}>{props.name}</div>
      <For each={typedKeys(props.spread)}>{(key) => <Swatch color={props.spread[key]} />}</For>
    </div>
  );
};

function Palettes() {
  return (
    <Group gap="lg" alignItems="start">
      <Palette spread={palette.gray} name="gray" />
      <Palette spread={palette.coolgray} name="coolgray" />
      <Palette spread={palette.warmgray} name="warmgray" />
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
