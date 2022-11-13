import { ParentComponent } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Aside } from '../../components';
import { Nav } from '../../components/navigation';
import { Cancel, Close, Success } from '../../icons';
import { cx } from '../../styles';

export const $category = 'navigation';

const A: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = props => (
  <a {...props} onClick={() => alert('clicked')}>
    {props.children}
  </a>
);

function NavDemo() {
  return (
    <Aside>
      <Nav classList={cx({ w: '15rem' })}>
        <Nav.Title>Admin</Nav.Title>
        <Nav.Link as={A} href="/" icon={<Close />}>
          Site
        </Nav.Link>
        <Nav.Link as={A} href="/" active icon={<Cancel />}>
          Channels
        </Nav.Link>
        <Nav.Link as={A} href="/" icon={<Success />}>
          Users
        </Nav.Link>
        <Nav.Link as={A} href="/" disabled>
          Settings
        </Nav.Link>
      </Nav>
    </Aside>
  );
}

export default () => <NavDemo />;
