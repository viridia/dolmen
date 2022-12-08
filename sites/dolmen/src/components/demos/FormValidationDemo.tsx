import { Button, createFormValidation, FormField, Group, Input, Stack, TextArea } from 'dolmen';
import { VoidComponent } from 'solid-js';

function getErrorMessage(code: string | undefined) {
  if (code === 'required') {
    return 'Channel name is required.';
  }
  return code;
}

export const FormValidationDemo: VoidComponent = () => {
  const { errors, formProps } = createFormValidation<{
    channelName: string;
    description: string;
  }>({
    channelName: {
      required: (data: string) => data.length > 0,
    },
  });

  return (
    <form {...formProps}>
      <Stack gap="xl">
        <FormField title="Channel Name" error={getErrorMessage(errors.channelName)}>
          <Input name="channelName" max={24} autofocus />
        </FormField>
        <FormField title="Channel Description">
          <TextArea name="description" />
        </FormField>
        <Group gap="md" justifyContent="end">
          <Button type="button">Cancel</Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
