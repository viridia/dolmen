import { Stack } from '../../components';
import { Breadcrumbs, BreadcrumbsItem } from '../../components/navigation';

export const $category = 'navigation';

function BreadcrumbsDemo() {
  return (
    <Stack gap="xl">
      <Breadcrumbs>
        <BreadcrumbsItem>Here</BreadcrumbsItem>
        <BreadcrumbsItem>There</BreadcrumbsItem>
        <BreadcrumbsItem>Everywhere</BreadcrumbsItem>
      </Breadcrumbs>
    </Stack>
  );
}

export default () => <BreadcrumbsDemo />;
