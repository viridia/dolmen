import { Button, ButtonGroup, Stack } from '../../components';

export const $category = 'core';

function ButtonGroupDemo() {
  return (
    <Stack gap="xl">
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button selected>Three</Button>
        <Button>Four</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button color="primary">One</Button>
        <Button color="primary">Two</Button>
        <Button color="primary" selected>Three</Button>
        <Button color="primary">Four</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button color="danger">One</Button>
        <Button color="danger">Two</Button>
        <Button color="danger" selected>Three</Button>
        <Button color="danger">Four</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button color="subtle">One</Button>
        <Button color="subtle">Two</Button>
        <Button color="subtle" selected>Three</Button>
        <Button color="subtle">Four</Button>
      </ButtonGroup>
    </Stack>
  );
}

export default () => <ButtonGroupDemo />;
