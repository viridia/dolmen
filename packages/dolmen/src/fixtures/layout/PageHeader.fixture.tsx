import { Button, PageHeader, Spacer } from '../../components';
import { demoPage } from './demoPage';

export const $category = 'layout';

function PageHeaderDemo() {
  return (
    <div class={demoPage()}>
      <PageHeader>
        <PageHeader.Title>Page Title</PageHeader.Title>
        <Spacer />
        <Button icon round>
          X
        </Button>
        <Button icon round>
          Y
        </Button>
        <Button icon round>
          Z
        </Button>
        <Button>Register</Button>
        <Button color="primary">Sign In</Button>
      </PageHeader>
      <div style={{ flex: 1 }} />
    </div>
  );
}

export default () => <PageHeaderDemo />;
