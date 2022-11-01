import { FormField, Input, Stack } from '../../components';

export const $category = 'form';

export default () => (
  <Stack gap="md" style={{ width: '20rem' }}>
    <FormField title="With Title">
      <Input value="default" />
    </FormField>
    <FormField title="With Title" description="And also with a description">
      <Input value="default" />
    </FormField>
    <FormField>
      <Input value="default" />
    </FormField>
    <FormField severity="warning" message="Warning">
      <Input value="default" />
    </FormField>
    <FormField
      severity="error"
      message="Error - a very long error message that should wrap to the next line."
    >
      <Input value="default" />
    </FormField>
    <FormField warning="Warning shortcut attribute">
      <Input value="default" />
    </FormField>
    <FormField error="Error shortcut attribute">
      <Input value="default" />
    </FormField>
  </Stack>
);
