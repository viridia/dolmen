import { createSignal } from 'solid-js';
import { Group, Knob, Stack, Title } from '../../components';

export const $category = 'core';

export default () => {
  const [value, setValue] = createSignal(0);
  return (
    <Stack gap="xl">
      <Title>Sizes</Title>
      <Group gap="md">
        <Knob
          value={value()}
          onChange={setValue}
          max={100}
          majorTick={10}
          minorTick={2}
          size="xl"
        />
        <Knob
          value={value()}
          onChange={setValue}
          max={100}
          majorTick={10}
          minorTick={2}
          size="lg"
        />
        <Knob
          value={value()}
          onChange={setValue}
          max={100}
          majorTick={10}
          minorTick={2}
          size="md"
        />
        <Knob
          value={value()}
          onChange={setValue}
          max={100}
          majorTick={10}
          minorTick={2}
          size="sm"
        />
        <Knob
          value={value()}
          onChange={setValue}
          max={100}
          majorTick={10}
          minorTick={2}
          size="xs"
        />
      </Group>
      <Title>Variations</Title>
      <Group gap="md">
        <Knob value={value()} onChange={setValue} max={100} majorTick={10} minorTick={2} />
        <Knob value={value()} onChange={setValue} max={100} majorTick={20} minorTick={5} />
        <Knob value={value()} onChange={setValue} max={100} majorTick={50} minorTick={10} arc="out" />
        <Knob value={value()} onChange={setValue} max={100} majorTick={50} minorTick={10} arc="in" />
        <Knob value={value()} onChange={setValue} max={100} majorTick={10} minorTick={2} arc="in" />
        <Knob value={value()} onChange={setValue} max={100} majorTick={10} minorTick={2} arc="none" />
      </Group>
    </Stack>
  );
};
