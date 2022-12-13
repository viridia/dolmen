import { RadioButton, Stack } from '../../components';

export const $category = 'form';

export default () => (
  <Stack gap="md">
    <RadioButton name="index" value={1}>
      One
    </RadioButton>
    <RadioButton name="index" value={2}>
      Two
    </RadioButton>
    <RadioButton name="index" value={3}>
      Three
    </RadioButton>
    <RadioButton name="index" value={4} checked>
      Checked
    </RadioButton>
    <RadioButton name="index" value={5} disabled>
      Unchecked disabled
    </RadioButton>
    <RadioButton name="index" value={6} checked disabled>
      Checked disabled
    </RadioButton>
    <RadioButton name="letter" value="alpha">
      Alpha
    </RadioButton>
    <RadioButton name="letter" value="beta">
      Beta
    </RadioButton>
    <RadioButton name="letter" value="gamma">
      Gamma
    </RadioButton>
  </Stack>
);
