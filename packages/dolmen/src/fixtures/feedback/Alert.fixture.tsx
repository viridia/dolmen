import { Alert, Stack } from '../../components';

export const $category = 'feedback';

function GroupDemo() {
  return (
    <Stack gap="md">
      <Alert severity="success">Hey, it actually worked!</Alert>
      <Alert severity="info">Just so you know...</Alert>
      <Alert severity="warning">I've got a bad feeling about this...</Alert>
      <Alert severity="error">Meeee-Maaaaw! Meeee-Maaaaw! Meeee-Maaaaw!</Alert>
      <Alert severity="success" when={false}>
        This should not be visible.
      </Alert>
    </Stack>
  );
}

export default () => <GroupDemo />;
