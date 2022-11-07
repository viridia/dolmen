import { Avatar, AvatarGroup, Stack } from '../../components';
import avtest from './avtest.jpg';

export const $category = 'data display';

function AvatarAvatarGroupDemo() {
  return (
    <Stack gap="xl">
      <AvatarGroup w="10rem">
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
      </AvatarGroup>
      <AvatarGroup w="10rem">
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
      </AvatarGroup>
      <AvatarGroup w="10rem">
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
      </AvatarGroup>
      <AvatarGroup w="10rem">
        <Avatar color="#ff0000">abc</Avatar>
        <Avatar color="#cc0044">abc</Avatar>
        <Avatar color="#880066">abc</Avatar>
        <Avatar color="#880088">abc</Avatar>
        <Avatar color="#4400cc">abc</Avatar>
        <Avatar color="#00ff88">abc</Avatar>
        <Avatar color="#00cc88">abc</Avatar>
        <Avatar color="#008888">abc</Avatar>
      </AvatarGroup>
    </Stack>
  );
}

export default () => <AvatarAvatarGroupDemo />;
