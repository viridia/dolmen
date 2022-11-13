import { Label, Stack } from '../../components';
import { cx } from '../../styles';

export const $category = 'form';

export default () => (
  <Stack gap="md">
    <Label>
      <input type="color" />
      No spacing
    </Label>
    <Label classList={cx({ gap: 'lg' })}>
      <input type="color" />
      No spacing
    </Label>
    <Label classList={cx({ flexDirection: 'column' })}>
      <input type="color" />
      No spacing
    </Label>
  </Stack>
);
