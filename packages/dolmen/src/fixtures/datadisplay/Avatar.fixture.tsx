import { Avatar, Group, Stack } from '../../components';
import avtest from './avtest.jpg';

export const $category = 'data display';

function AvatarDemo() {
  return (
    <Stack gap="xl">
      Sizes
      <Group gap="lg">
        <Avatar size="xs" color="#ff0000" src={avtest}>
          xs
        </Avatar>
        <Avatar size="sm" color="#cc0044" src={avtest}>
          sm
        </Avatar>
        <Avatar size="md" color="#880066" src={avtest}>
          md
        </Avatar>
        <Avatar size="lg" color="#880088" src={avtest}>
          lg
        </Avatar>
        <Avatar size="xl" color="#4400cc" src={avtest}>
          xl
        </Avatar>
      </Group>
      Sizes (No Image)
      <Group gap="lg">
        <Avatar size="xs" color="#ff0000">
          xs
        </Avatar>
        <Avatar size="sm" color="#cc0044">
          sm
        </Avatar>
        <Avatar size="md" color="#880066">
          md
        </Avatar>
        <Avatar size="lg" color="#880088">
          lg
        </Avatar>
        <Avatar size="xl" color="#4400cc">
          xl
        </Avatar>
      </Group>
      Radius
      <Group gap="lg">
        <Avatar radius="xs" color="#00ff88">
          xs
        </Avatar>
        <Avatar radius="sm" color="#00cc88">
          sm
        </Avatar>
        <Avatar radius="md" color="#008888">
          md
        </Avatar>
        <Avatar radius="lg" color="#004488">
          lg
        </Avatar>
        <Avatar radius="xl" color="#0044cc">
          xl
        </Avatar>
      </Group>
      Color Hashing
      <Group gap="lg">
        <Avatar colorHash="One">
          abc
        </Avatar>
        <Avatar colorHash="Two">
          abc
        </Avatar>
        <Avatar colorHash="Three">
          abc
        </Avatar>
        <Avatar colorHash="Four">
          abc
        </Avatar>
        <Avatar colorHash="Five">
          abc
        </Avatar>
        <Avatar colorHash="Six">
          abc
        </Avatar>
        <Avatar colorHash="Seven">
          abc
        </Avatar>
        <Avatar colorHash="Eight">
          abc
        </Avatar>
        <Avatar colorHash="Nine">
          abc
        </Avatar>
        <Avatar colorHash="Ten">
          abc
        </Avatar>
        <Avatar colorHash="Eleven">
          abc
        </Avatar>
        <Avatar colorHash="Twelve">
          abc
        </Avatar>
        <Avatar colorHash="Thirteen">
          abc
        </Avatar>
      </Group>
    </Stack>
  );
}

export default () => <AvatarDemo />;
