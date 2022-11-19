import { Label, Stack } from '../../components';

export const $category = 'form';

export default () => (
  <Stack gap="md">
    <Label>
      <input type="color" />
      No spacing
    </Label>
    <Label gap="lg">
      <input type="color" />
      gap="lg"
    </Label>
    <Label flexDirection="column">
      <input type="color" />
      flexDirection="column"
    </Label>
  </Stack>
);
