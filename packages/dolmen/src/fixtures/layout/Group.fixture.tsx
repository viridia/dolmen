import { Button, Group, Stack } from '../../components';

export const $category = 'layout';

function GroupDemo() {
  return (
    <Stack gap="xl">
      gap="md"
      <Group gap="md">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      gap="xs"
      <Group gap="xs">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      gap="xl"
      <Group gap="xl">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      flexDirection="row-reverse"
      <Group flexDirection="row-reverse">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      flexDirection="column"
      <Group flexDirection="column">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      flexDirection="column" alignItems="start"
      <Group flexDirection="column" alignItems="start">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      flexDirection="column" alignItems="end"
      <Group flexDirection="column" alignItems="end">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      justifyContent="space-between"
      <Group justifyContent="space-between">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      justifyContent="space-around"
      <Group justifyContent="space-around">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      justifyContent="space-evenly"
      <Group justifyContent="space-evenly">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
      justifyContent="center"
      <Group justifyContent="center">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Group>
    </Stack>
  );
}

export default () => <GroupDemo />;
