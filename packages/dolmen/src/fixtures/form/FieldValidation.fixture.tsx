import { FieldValidation, Input, Stack } from '../../components';

export const $category = 'form';

export default () => (
  <Stack gap="xl" style={{ width: '20rem' }}>
    <FieldValidation>
      <Input value="default" />
    </FieldValidation>
    <FieldValidation status="warning" message="Warning">
      <Input value="default" />
    </FieldValidation>
    <FieldValidation status="error" message="Error">
      <Input value="default" />
    </FieldValidation>
  </Stack>
);
