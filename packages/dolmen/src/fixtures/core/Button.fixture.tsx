import { Button, Group, Stack } from '../../components';
import { Cancel } from '../../icons';

export const $category = 'core';

function ButtonSizes() {
  return (
    <Group gap="md">
      <Button size="xl">X-Large</Button>
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">X-Small</Button>
      <Button size="mini">Mini</Button>
      <Button size="tiny">Tiny</Button>
    </Group>
  );
}

function ButtonColors() {
  return (
    <Stack gap="xl">
      <Group gap="md">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="danger">Danger</Button>
        <Button color="subtle">Subtle</Button>
      </Group>
      <Group gap="md">
        <Button color="default">Default<Cancel/></Button>
        <Button color="primary">Primary<Cancel/></Button>
        <Button color="danger">Danger<Cancel/></Button>
        <Button color="subtle">Subtle<Cancel/></Button>
      </Group>
    </Stack>
  );
}

function ButtonVariants() {
  return (
    <Group gap="md">
      <Button>Regular</Button>
      <Button round>Rounded</Button>
      <Button icon>
        <Cancel />
      </Button>
      <Button icon round>
        <Cancel />
      </Button>
    </Group>
  );
}

export default {
  Sizes: () => <ButtonSizes />,
  Colors: () => <ButtonColors />,
  Variants: () => <ButtonVariants />,
};
