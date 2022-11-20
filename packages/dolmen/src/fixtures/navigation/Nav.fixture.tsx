import { ParentComponent } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Aside } from '../../components';
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
    <Aside>
      <Nav style={{ width: '15rem' }}>
        <Nav.Title aria-label="admin">Admin</Nav.Title>
        <Nav.Link aria-label="site" as={A} href="/" icon={<Close />}>
          <span>Site</span>
        </Nav.Link>
        <Nav.Link aria-label="channels" as={A} href="/" active icon={<Cancel />}>
          Channels
        </Nav.Link>
        <Nav.Link aria-label="users" as={A} href="/" icon={<Success />}>
          Users
        </Nav.Link>
        <Nav.Link aria-label="settings" as={A} href="/" disabled>
          Settings
        </Nav.Link>
      </Nav>
    </Aside>
  );
}

export default () => <NavDemo />;
