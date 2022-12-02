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
    <FormField warning="Warning">
      <Input value="default" />
    </FormField>
    <FormField info="info">
      <Input value="default" />
    </FormField>
    <FormField success="success">
      <Input value="default" />
    </FormField>
    <FormField error="Error - a very long error message that should wrap to the next line.">
      <Input value="default" />
    </FormField>
  </Stack>
);
