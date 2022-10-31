import { ParentComponent } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Stack } from '../../components';
import { Breadcrumbs } from '../../components/navigation';

export const $category = 'navigation';

const A: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = props => (
  <a {...props} onClick={() => alert('clicked')}>
    {props.children}
  </a>
);

function BreadcrumbsDemo() {
  return (
    <Stack gap="xl">
      Static
      <Breadcrumbs>
        <Breadcrumbs.Item>Here</Breadcrumbs.Item>
        <Breadcrumbs.Item>There</Breadcrumbs.Item>
        <Breadcrumbs.Item>Everywhere</Breadcrumbs.Item>
      </Breadcrumbs>
      With links
      <Breadcrumbs>
        <Breadcrumbs.Link href="/">Here</Breadcrumbs.Link>
        <Breadcrumbs.Link href=".">There</Breadcrumbs.Link>
        <Breadcrumbs.Item>Everywhere</Breadcrumbs.Item>
      </Breadcrumbs>
      Custom link
      <Breadcrumbs>
        <Breadcrumbs.Link href="/" as={A}>
          Here
        </Breadcrumbs.Link>
        <Breadcrumbs.Link href="." as={A}>
          There
        </Breadcrumbs.Link>
        <Breadcrumbs.Item>Everywhere</Breadcrumbs.Item>
      </Breadcrumbs>
    </Stack>
  );
}

export default () => <BreadcrumbsDemo />;
