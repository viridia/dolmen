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
    <FormField status="warning" message="Warning">
      <Input value="default" />
    </FormField>
    <FormField status="error" message="Error">
      <Input value="default" />
    </FormField>
  </Stack>
);
