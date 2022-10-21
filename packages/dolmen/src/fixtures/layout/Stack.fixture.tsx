import { Button, Stack, Group } from '../../components';

export const $category = 'layout';

function StackDemo() {
  return (
    <Group gap="xl">
      <Stack w="10rem">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
      <Stack gap="xl" w="10rem">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
      <Stack gap="md" w="10rem">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
    </Group>
  );
}

export default () => <StackDemo />;
