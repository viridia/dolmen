import { createFixtureParams } from 'solid-codex-api';
import { Button, Group, Stack } from '../../components';
import { Cancel } from '../../icons';

export const $category = 'core';

function ButtonSizes() {
  const params = createFixtureParams({
    disabled: { type: 'boolean' },
    round: { type: 'boolean' },
  });
  return (
    <Group gap="md">
      <Button size="xl" disabled={params.disabled()} round={params.round()}>
        X-Large
      </Button>
      <Button size="lg" disabled={params.disabled()} round={params.round()}>
        Large
      </Button>
      <Button size="md" disabled={params.disabled()} round={params.round()}>
        Medium
      </Button>
      <Button size="sm" disabled={params.disabled()} round={params.round()}>
        Small
      </Button>
      <Button size="xs" disabled={params.disabled()} round={params.round()}>
        X-Small
      </Button>
      <Button size="mini" disabled={params.disabled()} round={params.round()}>
        Mini
      </Button>
      <Button size="tiny" disabled={params.disabled()} round={params.round()}>
        Tiny
      </Button>
    </Group>
  );
}

function ButtonColors() {
  const params = createFixtureParams({
    disabled: { type: 'boolean' },
    round: { type: 'boolean' },
  });
  return (
    <Stack gap="xl">
      <Group gap="md">
        <Button color="default" disabled={params.disabled()} round={params.round()}>
          Default
        </Button>
        <Button color="primary" disabled={params.disabled()} round={params.round()}>
          Primary
        </Button>
        <Button color="danger" disabled={params.disabled()} round={params.round()}>
          Danger
        </Button>
        <Button color="subtle" disabled={params.disabled()} round={params.round()}>
          Subtle
        </Button>
      </Group>
      <Group gap="md">
        <Button color="default" disabled={params.disabled()} round={params.round()}>
          Default
          <Cancel />
        </Button>
        <Button color="primary" disabled={params.disabled()} round={params.round()}>
          Primary
          <Cancel />
        </Button>
        <Button color="danger" disabled={params.disabled()} round={params.round()}>
          Danger
          <Cancel />
        </Button>
        <Button color="subtle" disabled={params.disabled()} round={params.round()}>
          Subtle
          <Cancel />
        </Button>
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
