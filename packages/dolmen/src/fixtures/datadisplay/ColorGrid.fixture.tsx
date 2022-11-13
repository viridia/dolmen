import { createSignal } from 'solid-js';
import { ColorGrid, Stack } from '../../components';
import { cx, palette } from '../../styles';

export const $category = 'data display';

const colors = [
  palette.white,
  palette.gray50,
  palette.gray100,
  palette.gray200,
  palette.gray250,
  palette.gray300,
  palette.gray400,
  palette.gray500,
  palette.gray600,
  palette.gray700,
  palette.gray750,
  palette.gray800,
  palette.gray850,
  palette.gray900,
  palette.gray950,
  palette.black,
];

function ColorGridDemo() {
  const [selected, setSelected] = createSignal(palette.black);
  return (
    <Stack gap="md">
      No Gap
      <ColorGrid classList={cx({ w: '10rem' })} colors={colors} value={selected()} onChange={setSelected} name="nogap" />
      Gap (sm)
      <ColorGrid
        gap="sm"
        classList={cx({ w: '10rem' })}
        colors={colors}
        value={selected()}
        onChange={setSelected}
        name="gap"
      />
      Narrow
      <ColorGrid
        gap="sm"
        classList={cx({ w: '5rem' })}
        colors={colors}
        value={selected()}
        onChange={setSelected}
        name="narrow"
      />
      Columns = 5
      <ColorGrid
        name="5columns"
        gap="sm"
        classList={cx({ w: '10rem' })}
        columns={5}
        colors={colors}
        value={selected()}
        onChange={setSelected}
      />
      Column-major
      <ColorGrid
        name="cmajor"
        gap="sm"
        classList={cx({ w: '10rem' })}
        columnMajor
        rows={4}
        colors={colors}
        value={selected()}
        onChange={setSelected}
      />
      Uncontrolled
      <ColorGrid gap="sm" classList={cx({ w: '10rem' })} colors={colors} value={palette.coolgray100} />
    </Stack>
  );
}

export default () => <ColorGridDemo />;
