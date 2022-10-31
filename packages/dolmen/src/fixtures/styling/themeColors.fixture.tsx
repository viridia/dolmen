import { colord } from 'colord';
import { For, VoidComponent } from 'solid-js';
import { Group } from '../../components';
import { css, fontSize, theme } from '../../styles';
import { dark, light } from '../../theme';

export const $name = 'theme colors';

export const swatchStyle = css({
  width: 192,
  height: 20,
  alignItems: 'center',
  justifyContent: 'start',
  display: 'flex',
  fontSize: fontSize.mini,
  padding: '0 8px',
});

export const nameStyle = css({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  padding: 8,
});

export const $category = 'styling';

const Swatch: VoidComponent<{ color: string; key?: string }> = props => {
  const c = colord(props.color);
  const color = c.brightness() > 0.5 ? '#000' : '#fff';
  return (
    <div class={swatchStyle()} style={{ 'background-color': props.color, color: color }}>
      {props.key}
    </div>
  );
};

const Palette: VoidComponent<{ name: string; colors: typeof light.colors }> = props => {
  const keys = Object.keys(theme.colors) as (keyof typeof light.colors)[];
  return (
    <div>
      <div class={nameStyle()}>{props.name}</div>
      <For each={keys}>{key => <Swatch color={props.colors[key].value} key={key} />}</For>
    </div>
  );
};

function ThemeColors() {
  return (
    <Group gap="lg" alignItems="start">
      <Palette name="light" colors={light.colors} />
      <Palette name="dark" colors={dark.colors} />
    </Group>
  );
}

export default () => <ThemeColors />;
