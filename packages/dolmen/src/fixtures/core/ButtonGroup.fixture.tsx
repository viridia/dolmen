import { createSignal } from 'solid-js';
import { Button, ButtonGroup, Stack } from '../../components';
import { Cancel, Close, DarkMode, LightMode } from '../../icons';

export const $category = 'core';

function ButtonGroupDemo() {
  const [selected, setSelected] = createSignal(3);
  return (
    <Stack gap="xl">
      <ButtonGroup>
        <Button selected={selected() === 1} onClick={() => setSelected(1)}>
          One
        </Button>
        <Button selected={selected() === 2} onClick={() => setSelected(2)}>
          Two
        </Button>
        <Button selected={selected() === 3} onClick={() => setSelected(3)}>
          Three
        </Button>
        <Button selected={selected() === 4} onClick={() => setSelected(4)}>
          Four
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button selected={selected() === 1} onClick={() => setSelected(1)}>
          <Cancel />
        </Button>
        <Button selected={selected() === 2} onClick={() => setSelected(2)}>
          <Close />
        </Button>
        <Button selected={selected() === 3} onClick={() => setSelected(3)}>
          <DarkMode />
        </Button>
        <Button selected={selected() === 4} onClick={() => setSelected(4)}>
          <LightMode />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default () => <ButtonGroupDemo />;
