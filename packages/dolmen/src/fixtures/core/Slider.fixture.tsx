import { useCodex } from 'solid-codex-api';
import { createSignal } from 'solid-js';
import { Card, Group, Slider, Stack } from '../../components';

export const $category = 'core';

export default {
  basic: () => {
    const params = useCodex().createParams({
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
  'on card': () => {
    const params = useCodex().createParams({
      min: { type: 'integer', minVal: -100, maxVal: 1000, default: 0 },
      max: { type: 'integer', minVal: -100, maxVal: 1000, default: 100 },
      step: { type: 'integer', minVal: 0, maxVal: 100, default: 0 },
    });
    const [value, setValue] = createSignal(0);
    return (
      <Card w="10rem">
        <Card.Content>
          <Slider
            value={value()}
            min={params.min()}
            max={params.max()}
            step={params.step()}
            onChange={value => setValue(value)}
            valueLabelDisplay="auto"
          />
        </Card.Content>
      </Card>
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
  'custom label format': () => {
    const [value, setValue] = createSignal(50);
    return (
      <Stack style={{ width: '15rem' }} gap="lg">
        <Slider
          value={value()}
          valueLabelDisplay="on"
          valueLabelFormat={value => `${value.toFixed(0)}%`}
          onChange={value => setValue(value)}
        />
      </Stack>
    );
  },
  marks: () => {
    const [value, setValue] = createSignal(50);
    return (
      <Stack style={{ width: '15rem' }} gap="lg">
        <Slider
          value={value()}
          valueLabelDisplay="auto"
          step={5}
          size="xs"
          marks
          onChange={value => setValue(value)}
        />
        <Slider
          value={value()}
          valueLabelDisplay="auto"
          step={5}
          marks
          onChange={value => setValue(value)}
        />
        <Slider
          value={value()}
          valueLabelDisplay="auto"
          step={5}
          size="xl"
          marks
          onChange={value => setValue(value)}
        />
        <Slider
          value={value()}
          valueLabelDisplay="auto"
          marks={[
            { value: 0 },
            { value: 10 },
            { value: 20 },
            { value: 30 },
            { value: 40 },
            { value: 50 },
            { value: 60 },
            { value: 70 },
            { value: 80 },
            { value: 90 },
            { value: 100 },
          ]}
          onChange={value => setValue(value)}
        />
        <Slider
          value={value()}
          valueLabelDisplay="auto"
          marks={[
            { value: 0, label: 'hopeless' },
            { value: 10, label: 'miserable' },
            { value: 20, label: 'pathetic' },
            { value: 30, label: 'poor' },
            { value: 40, label: 'mediocre' },
            { value: 50, label: 'average' },
            { value: 60, label: 'fine' },
            { value: 70, label: 'good' },
            { value: 80, label: 'superb' },
            { value: 90, label: 'epic' },
            { value: 100, label: 'legendary' },
          ]}
          onChange={value => setValue(value)}
        />
      </Stack>
    );
  },
};
