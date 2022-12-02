import { For, VoidComponent } from 'solid-js';
import { Group } from '../../components';
import './styles.scss';

export const $category = 'styling';
export const colorKeys = [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950];

const Swatch: VoidComponent<{ color: string; key?: number }> = props => {
  return <div class={`swatch swatch-${props.color}`}>{props.key}</div>;
};

const Palette: VoidComponent<{ name: string }> = props => {
  return (
    <div>
      <div class="name">{props.name}</div>
      <For each={colorKeys}>{key => <Swatch color={`${props.name}${key}`} key={key} />}</For>
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
        <div class="name">white</div>
        <Swatch color="#ffffff" />
      </div>
      <div>
        <div class="name">black</div>
        <Swatch color="#000000" />
      </div>
    </Group>
  );
}

export default () => <Palettes />;
