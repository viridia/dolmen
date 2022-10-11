import { ToggleSwitch, Stack } from '../../components';

export const $category = 'form';

export default () => (
  <Stack gap="md">
    <ToggleSwitch>Unchecked</ToggleSwitch>
    <ToggleSwitch checked>Checked</ToggleSwitch>
    <ToggleSwitch disabled>Unchecked disabled</ToggleSwitch>
    <ToggleSwitch checked disabled>
      Checked disabled
    </ToggleSwitch>
  </Stack>
);
