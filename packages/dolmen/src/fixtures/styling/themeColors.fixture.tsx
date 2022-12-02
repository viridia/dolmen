import { colord } from 'colord';
import { For, VoidComponent } from 'solid-js';
import { Group } from '../../components';
import { designTokens, DesignTokens } from '../../styles';
import './styles.scss';

export const $name = 'theme colors';

export const $category = 'styling';

const Swatch: VoidComponent<{ color: string; key?: string }> = props => {
  const c = colord(props.color);
  const color = c.isLight() ? '#000' : '#fff';
  return (
    <div class="swatch" style={{ 'background-color': props.color, color: color }}>
      {props.key}
    </div>
  );
};

const Palette: VoidComponent<{ name: string; class: string }> = props => {
  const keys = Object.keys(designTokens.color) as (keyof DesignTokens['color'])[];
  return (
    <div class={props.class}>
      <div class="name">{props.name}</div>
      <For each={keys}>
        {key => <Swatch color={designTokens.color[key].value} key={designTokens.color[key].var} />}
      </For>
    </div>
  );
};

function ThemeColors() {
  return (
    <Group gap="lg" alignItems="start">
      <Palette name="light" class="dm-theme-light" />
      <Palette name="dark" class="dm-theme-dark" />
    </Group>
  );
}

export default () => <ThemeColors />;
