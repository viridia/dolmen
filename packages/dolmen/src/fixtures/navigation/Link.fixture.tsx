import { Stack, Link } from '../../components';

export const $category = 'navigation';

function NavDemo() {
  return (
    <Stack gap="md">
      <div>
        This is a <Link href="/">link</Link>
      </div>
      <div>
        This is a{' '}
        <Link href="/" disabled>
          disabled link
        </Link>
      </div>
    </Stack>
  );
}

export default () => <NavDemo />;
