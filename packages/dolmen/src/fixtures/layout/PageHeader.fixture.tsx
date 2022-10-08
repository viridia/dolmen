import { Button, PageHeader, Spacer } from '../../components';
import { layoutStyle } from './layout.css';

function PageHeaderDemo() {
  return (
    <div class={layoutStyle}>
      <PageHeader>
        Page Header
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
