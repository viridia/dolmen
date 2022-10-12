import { createSignal } from 'solid-js';
import { Button, Group, Modal } from '../../components';

export const $category = 'core';

export default () => {
  const [open, setOpen] = createSignal(false);
  return (
    <Group gap="md">
      <Button onClick={() => setOpen(true)}>Open [xl]</Button>
      <Modal
        open={open()}
        onClose={() => {
          setOpen(false);
        }}
        withClose
      >
        <Modal.Header>Modal Example</Modal.Header>
        <Modal.Body>Hello</Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button color="primary" autofocus>Close</Button>
        </Modal.Footer>
      </Modal>
    </Group>
  );
};
