import { createSignal } from 'solid-js';
import { Card, Select, Stack } from '../../components';
import { cx } from '../../styles';

export const $category = 'form';

function SelectDemo() {
  const [selected, setSelected] = createSignal(-1);
  return (
    <Stack gap="xl" classList={cx({ w: '20rem' })}>
      <Card classList={cx({ h: '20rem' })}>
        <Card.Content classList={cx({ p: '1rem' })}>
          <Select
            selected={selected()}
            onSelect={setSelected}
            placeholder="Select a number..."
            options={[
              {
                value: 1,
                label: 'One',
              },
              {
                value: 2,
                label: 'Two',
              },
              {
                value: 3,
                label: 'Three',
              },
              {
                value: 4,
                label: 'Four',
              },
              {
                value: 5,
                label: 'Five',
              },
              {
                value: 100,
                label: 'A gigantic googleplex of infinite multitudes',
              },
            ]}
          />
        </Card.Content>
      </Card>
    </Stack>
  );
}

export default () => <SelectDemo />;
