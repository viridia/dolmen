import { Button, Stack, PageHeader, Spacer, Group } from '../../components';

function StackDemo() {
  return (
    <Group gap="xl">
      <Stack style={{ width: '10rem' }}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
      <Stack gap="xl" style={{ width: '10rem' }}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
      <Stack gap="md" style={{ width: '10rem' }}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
    </Group>
  );
}

export default () => <StackDemo />;
