import { Button, Stack, Group } from '../../components';
import { cx } from '../../styles';

export const $category = 'layout';

function StackDemo() {
  return (
    <Group gap="xl">
      <Stack classList={cx({ w: '10rem' })}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
      <Stack gap="xl" classList={cx({ w: '10rem' })}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
      <Stack gap="md" classList={cx({ w: '10rem' })}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Stack>
    </Group>
  );
}

export default () => <StackDemo />;
