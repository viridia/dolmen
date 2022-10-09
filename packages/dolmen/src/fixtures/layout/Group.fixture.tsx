import { Button, Group, PageHeader, Spacer } from '../../components';

export const $category = 'layout';

function GroupDemo() {
  return (
    <Group gap="md">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Group>
  );
}

export default () => <GroupDemo />;
