import { ParentComponent } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Card, Stack } from '../../components';
import { Nav } from '../../components/navigation';
import { Cancel, Close, Success } from '../../icons';

export const $category = 'navigation';

const A: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = props => (
  <a {...props} onClick={() => alert('clicked')}>
    {props.children}
  </a>
);

function NavDemo() {
  return (
    <Stack gap="xl">
      <Card style={{ width: '15rem' }}>
        <Nav>
          <Nav.Group aria-label="admin">Admin</Nav.Group>
          <Nav.Link aria-label="site" as={A} href="/" icon={<Close width={20} />}>
            <span>Site</span>
          </Nav.Link>
          <Nav.Link aria-label="channels" as={A} href="/" current icon={<Cancel width={20} />}>
            Channels
          </Nav.Link>
          <Nav.Link aria-label="users" as={A} href="/" icon={<Success width={20} />}>
            Users
          </Nav.Link>
          <Nav.Link aria-label="settings" as={A} href="/" disabled>
            Settings
          </Nav.Link>
        </Nav>
      </Card>
      <Card style={{ width: '15rem' }}>
        <Nav>
          <Nav.Group aria-label="admin">Admin</Nav.Group>
          <Nav.Subgroup aria-label="admin">Subgroup</Nav.Subgroup>
          <Nav.Link aria-label="site" as={A} href="/">
            <span>Site</span>
          </Nav.Link>
          <Nav.Link aria-label="channels" as={A} href="/" current>
            Channels
          </Nav.Link>
          <Nav.Subgroup aria-label="admin">Subgroup</Nav.Subgroup>
          <Nav.Link aria-label="users" as={A} href="/">
            Users
          </Nav.Link>
          <Nav.Link aria-label="settings" as={A} href="/" disabled>
            Settings
          </Nav.Link>
        </Nav>
      </Card>
    </Stack>
  );
}

export default () => <NavDemo />;
