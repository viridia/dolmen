import { useCodex } from 'solid-codex-api';
import { ColorSwatch, Group, Stack } from '../../components';
import { cx } from '../../styles';

export const $category = 'data display';

function ColorSwatchDemo() {
  const codex = useCodex();
  const click = codex.action('click');
  return (
    <Stack gap="md">
      Non-clickable
      <Group gap="md">
        <ColorSwatch color="#ff0000" />
        <ColorSwatch color="#ff2200" />
        <ColorSwatch color="#ff4400" />
        <ColorSwatch color="#ff6600" />
      </Group>
      Clickable
      <Group gap="md">
        <ColorSwatch color="#ff00ff" onClick={click} selected />
        <ColorSwatch color="#ff22ff" onClick={click} />
        <ColorSwatch color="#ff44ff" onClick={click} />
        <ColorSwatch color="#ff66ff" onClick={click} />
      </Group>
      Sizes
      <Group gap="md">
        <ColorSwatch color="#ff0000" classList={cx({ w: 8 })} />
        <ColorSwatch color="#ff2200" classList={cx({ w: 12 })} />
        <ColorSwatch color="#ff4400" classList={cx({ w: 16 })} />
        <ColorSwatch color="#ff6600" classList={cx({ w: 24 })} />
      </Group>
    </Stack>
  );
}

export default () => <ColorSwatchDemo />;
