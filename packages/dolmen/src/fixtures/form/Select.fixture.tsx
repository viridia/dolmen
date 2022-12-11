import { createSignal } from 'solid-js';
import { Card, Select, Stack } from '../../components';

export const $category = 'form';

function SelectDemo() {
  const [selected, setSelected] = createSignal(-1);
  return (
    <Stack gap="xl" style={{ width: '20rem' }}>
        <Card.Content style={{ padding: '1rem' }}>
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
    </Stack>
  );
}

export default () => <SelectDemo />;
