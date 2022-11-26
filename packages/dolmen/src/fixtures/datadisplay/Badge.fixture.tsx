import { Badge, Group, Stack } from '../../components';

export const $category = 'data display';

function BadgeDemo() {
  return (
    <Stack gap="xl">
      Sizes
      <Group gap="lg">
        <Badge size="xs" color="#ff0000">
          size = xs
        </Badge>
        <Badge size="sm" color="#cc0044">
          size = sm
        </Badge>
        <Badge size="md" color="#880066">
          size = md
        </Badge>
        <Badge size="lg" color="#880088">
          size = lg
        </Badge>
        <Badge size="xl" color="#4400cc">
          size = xl
        </Badge>
      </Group>
      Radius
      <Group gap="lg">
        <Badge radius="xs" color="#00ff88">
          radius = xs
        </Badge>
        <Badge radius="sm" color="#00cc88">
          radius = sm
        </Badge>
        <Badge radius="md" color="#008888">
          radius = md
        </Badge>
        <Badge radius="lg" color="#004488">
          radius = lg
        </Badge>
        <Badge radius="xl" color="#0044cc">
          radius = xl
        </Badge>
      </Group>
      Inline
      <Group gap="md" alignItems="center">
        <Badge size="xs" color="#00ff88">
          Welcome
        </Badge>{' '}
        Size = xs
      </Group>
      <Group gap="md">
        <Badge size="sm" color="#00ff88">
          Welcome
        </Badge>{' '}
        Size = sm
      </Group>
      <Group gap="md">
        <Badge size="md" color="#00ff88">
          Welcome
        </Badge>{' '}
        Size = md
      </Group>
      <Group gap="md">
        <Badge size="lg" color="#00ff88">
          Welcome
        </Badge>{' '}
        Size = lg
      </Group>
      <Group gap="md">
        <Badge size="xl" color="#00ff88">
          Welcome
        </Badge>{' '}
        Size = xl
      </Group>
    </Stack>
  );
}

export default () => <BadgeDemo />;
