import { createSignal } from 'solid-js';
import { ColorGrid, Stack } from '../../components';

export const $category = 'data display';

const colors = [
  '#fff',
  '#eee',
  '#ddd',
  '#ccc',
  '#bbb',
  '#aaa',
  '#999',
  '#888',
  '#777',
  '#666',
  '#555',
  '#444',
  '#333',
  '#222',
  '#111',
  '#000',
];

function ColorGridDemo() {
  const [selected, setSelected] = createSignal('#fff');
  return (
    <Stack gap="md" alignItems="start">
      No Gap
      <ColorGrid
        style={{ width: '10rem' }}
        colors={colors}
        value={selected()}
        onChange={setSelected}
        name="nogap"
      />
      Gap (sm)
      <ColorGrid
        gap="sm"
        style={{ width: '10rem' }}
        colors={colors}
        value={selected()}
        onChange={setSelected}
        name="gap"
      />
      Narrow
      <ColorGrid
        gap="sm"
        style={{ width: '5rem' }}
        colors={colors}
        value={selected()}
        onChange={setSelected}
        name="narrow"
      />
      Columns = 5
      <ColorGrid
        name="5columns"
        gap="sm"
        style={{ width: '10rem' }}
        columns={5}
        colors={colors}
        value={selected()}
        onChange={setSelected}
      />
      Column-major
      <ColorGrid
        name="cmajor"
        gap="sm"
        style={{ width: '10rem' }}
        columnMajor
        rows={4}
        colors={colors}
        value={selected()}
        onChange={setSelected}
      />
      Uncontrolled
      <ColorGrid gap="sm" style={{ width: '10rem' }} colors={colors} value={'#eee'} />
    </Stack>
  );
}

export default () => <ColorGridDemo />;
