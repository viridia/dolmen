import { Button, ButtonGroup } from '../../components';

export const $category = 'core';

function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
  );
}

export default () => <ButtonGroupDemo />;
