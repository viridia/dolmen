import { Avatar, AvatarGroup, Stack } from '../../components';
import avtest from './avtest.jpg';

export const $category = 'data display';

function AvatarAvatarGroupDemo() {
  return (
    <Stack gap="xl">
      <AvatarGroup style={{ width: '10rem' }}>
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
      </AvatarGroup>
      <AvatarGroup style={{ width: '10rem' }}>
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
        <Avatar src={avtest} />
      </AvatarGroup>
      <AvatarGroup style={{ width: '10rem' }}>
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
      <AvatarGroup style={{ width: '10rem' }}>
        <Avatar color="#ff0000">ab</Avatar>
        <Avatar color="#cc0044">cd</Avatar>
        <Avatar color="#880066">ef</Avatar>
        <Avatar color="#880088">gh</Avatar>
        <Avatar color="#4400cc">ij</Avatar>
        <Avatar color="#00ff88">kl</Avatar>
        <Avatar color="#00cc88">mn</Avatar>
        <Avatar color="#008888">op</Avatar>
      </AvatarGroup>
    </Stack>
  );
}

export default () => <AvatarAvatarGroupDemo />;
