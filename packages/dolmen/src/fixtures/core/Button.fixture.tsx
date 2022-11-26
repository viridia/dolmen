import { useCodex } from 'solid-codex-api';
import { Button, Group, Stack } from '../../components';
import { Cancel } from '../../icons';

export const $category = 'core';

function ButtonSizes() {
  const codex = useCodex();
  const params = codex.createParams({
    disabled: { type: 'boolean' },
    round: { type: 'boolean' },
  });
  const click = codex.action('click');
  return (
    <Group gap="md">
      <Button size="xl" disabled={params.disabled()} round={params.round()} onClick={click}>
        X-Large
      </Button>
      <Button size="lg" disabled={params.disabled()} round={params.round()} onClick={click}>
        Large
      </Button>
      <Button size="md" disabled={params.disabled()} round={params.round()} onClick={click}>
        Medium
      </Button>
      <Button size="sm" disabled={params.disabled()} round={params.round()} onClick={click}>
        Small
      </Button>
      <Button size="xs" disabled={params.disabled()} round={params.round()} onClick={click}>
        X-Small
      </Button>
      <Button size="xxs" disabled={params.disabled()} round={params.round()} onClick={click}>
        Mini
      </Button>
      <Button size="xxxs" disabled={params.disabled()} round={params.round()} onClick={click}>
        Tiny
      </Button>
    </Group>
  );
}

function ButtonColors() {
  const codex = useCodex();
  const params = codex.createParams({
    disabled: { type: 'boolean' },
    round: { type: 'boolean' },
  });
  const click = codex.action('click');
  return (
    <Stack gap="xl">
      <Group gap="md">
        <Button color="default" disabled={params.disabled()} round={params.round()} onClick={click}>
          Default
        </Button>
        <Button color="primary" disabled={params.disabled()} round={params.round()} onClick={click}>
          Primary
        </Button>
        <Button color="danger" disabled={params.disabled()} round={params.round()} onClick={click}>
          Danger
        </Button>
        <Button color="subtle" disabled={params.disabled()} round={params.round()} onClick={click}>
          Subtle
        </Button>
      </Group>
      <Group gap="md">
        <Button color="default" disabled={params.disabled()} round={params.round()} onClick={click}>
          Default
          <Cancel />
        </Button>
        <Button color="primary" disabled={params.disabled()} round={params.round()} onClick={click}>
          Primary
          <Cancel />
        </Button>
        <Button color="danger" disabled={params.disabled()} round={params.round()} onClick={click}>
          Danger
          <Cancel />
        </Button>
        <Button color="subtle" disabled={params.disabled()} round={params.round()} onClick={click}>
          Subtle
          <Cancel />
        </Button>
      </Group>
      <Group gap="md">
        <Button
          color="default"
          icon
          disabled={params.disabled()}
          round={params.round()}
          onClick={click}
        >
          <Cancel />
        </Button>
        <Button
          color="primary"
          icon
          disabled={params.disabled()}
          round={params.round()}
          onClick={click}
        >
          <Cancel />
        </Button>
        <Button
          color="danger"
          icon
          disabled={params.disabled()}
          round={params.round()}
          onClick={click}
        >
          <Cancel />
        </Button>
        <Button
          color="subtle"
          icon
          disabled={params.disabled()}
          round={params.round()}
          onClick={click}
        >
          <Cancel />
        </Button>
      </Group>
      Selected
      <Group gap="md">
        <Button
          color="default"
          selected
          disabled={params.disabled()}
          round={params.round()}
          onClick={click}
        >
          Default
          <Cancel />
        </Button>
        <Button
          color="subtle"
          selected
          disabled={params.disabled()}
          round={params.round()}
          onClick={click}
        >
          Subtle
          <Cancel />
        </Button>
      </Group>
    </Stack>
  );
}

function ButtonVariants() {
  const codex = useCodex();
  const click = codex.action('click');
  return (
    <Group gap="md">
      <Button onClick={click}>Regular</Button>
      <Button round onClick={click}>
        Rounded
      </Button>
      <Button icon onClick={click}>
        <Cancel />
      </Button>
      <Button icon round onClick={click}>
        <Cancel />
      </Button>
    </Group>
  );
}

function ButtonLinks() {
  const codex = useCodex();
  const click = codex.action('click');
  return (
    <Group gap="md">
      <Button.Link href="core-button-colors" target="new" onClick={click}>
        Regular
      </Button.Link>
      <Button.Link href="core-button-colors" target="new" round onClick={click}>
        Rounded
      </Button.Link>
      <Button.Link href="core-button-colors" target="new" icon onClick={click}>
        <Cancel />
      </Button.Link>
      <Button.Link href="core-button-colors" target="new" icon round onClick={click}>
        <Cancel />
      </Button.Link>
    </Group>
  );
}

export default {
  sizes: () => <ButtonSizes />,
  colors: () => <ButtonColors />,
  variants: () => <ButtonVariants />,
  links: () => <ButtonLinks />,
};
