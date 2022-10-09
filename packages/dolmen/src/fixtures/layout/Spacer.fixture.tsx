import { Button, Group, Spacer } from '../../components';

export const $category = 'layout';

function GroupDemo() {
  return (
    <Group gap="md">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Spacer />
      <Button>Four</Button>
      <Button>Five</Button>
    </Group>
  );
}

export default () => <GroupDemo />;
