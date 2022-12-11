import { Select } from 'dolmen';
import { createSignal, VoidComponent } from 'solid-js';

export const SelectDemo: VoidComponent = () => {
  const [selected, setSelected] = createSignal(-1);

  return (
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
  );
};
