import { ParentComponent } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Card, Group, Nav, Spacer, Stack } from '../../components';
import { Cancel, Close, Success } from '../../icons';

export const $category = 'navigation';

const A: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = props => (
  <a
    {...props}
    onClick={e => {
      alert('clicked');
      e.preventDefault();
    }}
  >
    {props.children}
  </a>
);

function NavDemo() {
  return (
    <Stack gap="xl">
      <Card style={{ width: '15rem' }}>
        <Nav>
          <Nav.Group>Admin</Nav.Group>
          <Nav.Subgroup>Subgroup</Nav.Subgroup>
          <Nav.Link aria-label="site" as={A} href="/">
            <span>Site</span>
          </Nav.Link>
          <Nav.Link aria-label="channels" as={A} href="/" current>
            <span>Channels</span>
          </Nav.Link>
          <Nav.Subgroup aria-label="admin">Subgroup</Nav.Subgroup>
          <Nav.Link aria-label="users" as={A} href="/">
            <span>Users</span>
          </Nav.Link>
          <Nav.Link aria-label="settings" as={A} href="/" disabled>
            <span>Settings</span>
          </Nav.Link>
        </Nav>
      </Card>
      <Card style={{ width: '15rem' }}>
        <Nav inset>
          <Nav.Group aria-label="admin">Admin</Nav.Group>
          <Nav.Link aria-label="site" as={A} href="/" icon={<Close width={20} />}>
            <span>Site</span>
          </Nav.Link>
          <Nav.Link aria-label="channels" as={A} href="/" current icon={<Cancel width={20} />}>
            <span>Channels</span>
          </Nav.Link>
          <Nav.Link aria-label="users" as={A} href="/" icon={<Success width={20} />}>
            <span>Users</span>
          </Nav.Link>
          <Nav.Link aria-label="settings" as={A} href="/" disabled>
            <span>Settings</span>
          </Nav.Link>
        </Nav>
      </Card>
      <Card>
        <Card.Content>
          <Group>
            <Nav.Prev aria-label="site" as={A} href="/" icon={<Close width={20} />}>
              <span>Site</span>
            </Nav.Prev>
            <Spacer />
            <Nav.Next aria-label="channels" as={A} href="/" current icon={<Cancel width={20} />}>
              <span>Channels</span>
            </Nav.Next>
          </Group>
        </Card.Content>
      </Card>
    </Stack>
  );
}

export default () => <NavDemo />;
