import { useCodex } from 'solid-codex-api';
import { ColorSwatch, Group, Stack } from '../../components';

export const $category = 'data display';

function ColorSwatchDemo() {
  const codex = useCodex();
  const click = codex.action('click');
  return (
    <Stack>
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
    </Stack>
  );
}

export default () => <ColorSwatchDemo />;
