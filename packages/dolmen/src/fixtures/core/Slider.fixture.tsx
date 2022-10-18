import { createFixtureParams } from 'solid-codex-api';
import { createSignal } from 'solid-js';
import { Group } from '../../components';
import { Slider } from '../../components';

export const $category = 'core';

export default () => {
  const params = createFixtureParams({
    min: { type: 'integer', minVal: -100, maxVal: 1000, default: 0 },
    max: { type: 'integer', minVal: -100, maxVal: 1000, default: 100 },
    step: { type: 'integer', minVal: 0, maxVal: 100, default: 0 },
    // vertical: { type: 'boolean' },
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
      />
    </Group>
  );
};
