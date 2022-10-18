import { createFixtureParams } from 'solid-codex-api';
import { createSignal } from 'solid-js';
import { Group, Slider, Stack } from '../../components';

export const $category = 'core';

export default {
  basic: () => {
    const params = createFixtureParams({
      min: { type: 'integer', minVal: -100, maxVal: 1000, default: 0 },
      max: { type: 'integer', minVal: -100, maxVal: 1000, default: 100 },
      step: { type: 'integer', minVal: 0, maxVal: 100, default: 0 },
    });
    const [value, setValue] = createSignal(0);
    return (
      <Group>
        <Slider
          value={value()}
          min={params.min()}
          max={params.max()}
          step={params.step()}
          onChange={value => setValue(value)}
          valueLabelDisplay="auto"
        />
      </Group>
    );
  },
  sizes: () => {
    const [value, setValue] = createSignal(50);
    return (
      <Stack style={{ width: '15rem' }} gap="lg">
        <Slider size="xl" value={value()} onChange={value => setValue(value)} />
        <Slider size="lg" value={value()} onChange={value => setValue(value)} />
        <Slider size="md" value={value()} onChange={value => setValue(value)} />
        <Slider size="sm" value={value()} onChange={value => setValue(value)} />
        <Slider size="xs" value={value()} onChange={value => setValue(value)} />
      </Stack>
    );
  },
};
