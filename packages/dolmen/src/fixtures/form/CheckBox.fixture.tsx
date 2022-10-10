import { CheckBox, Stack } from '../../components';

export const $category = 'form';

export default () => (
  <Stack gap="md">
    <CheckBox>Unchecked</CheckBox>
    <CheckBox checked>Checked</CheckBox>
    <CheckBox disabled>Unchecked disabled</CheckBox>
    <CheckBox checked disabled>
      Checked disabled
    </CheckBox>
  </Stack>
);
