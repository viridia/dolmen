import { createSignal } from 'solid-js';
import { Button, Card, Group, Menu, Stack } from '../../components';
import { Cancel } from '../../icons';

export const $category = 'core';

function ScrollingDemo() {
  const [anchorRef2, setAnchorRef2] = createSignal<HTMLElement>();
  return (
    <Stack gap="xl" w="20rem">
      <Card h="10rem"></Card>
      <Card h="60rem">
        <Card.Content p="1rem">
          <Button ref={setAnchorRef2}>Anchor Element</Button>
          <Menu.List anchor={anchorRef2()}>
            <Menu.Item>Alpha Wolf</Menu.Item>
            <Menu.Item>Beta Test</Menu.Item>
            <Menu.Item>Delta Dawn</Menu.Item>
            <Menu.Item>Gamma Ray</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Omega Man</Menu.Item>
          </Menu.List>
        </Card.Content>
      </Card>
    </Stack>
  );
}

function MenuListDemo() {
  const [anchorRef, setAnchorRef] = createSignal<HTMLElement>();
  const [anchorRef2, setAnchorRef2] = createSignal<HTMLElement>();
  return (
    <Group gap="xl">
      <Card w="15rem">
        <Card.Content p="1rem">
          <Button ref={setAnchorRef}>Default</Button>
          <Menu.List anchor={anchorRef()}>
            <Menu.Item>Alpha Wolf</Menu.Item>
            <Menu.Item>Beta Test</Menu.Item>
            <Menu.Item disabled>Delta Dawn</Menu.Item>
            <Menu.Item>Gamma Ray</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Omega Man</Menu.Item>
          </Menu.List>
        </Card.Content>
      </Card>
      <Card w="15rem">
        <Card.Content p="1rem">
          <Button ref={setAnchorRef2}>Inset</Button>
          <Menu.List inset anchor={anchorRef2()}>
            <Menu.ItemCheckBox checked>Alpha Wolf</Menu.ItemCheckBox>
            <Menu.ItemRadio>Beta Test</Menu.ItemRadio>
            <Menu.Item disabled>Delta Dawn</Menu.Item>
            <Menu.Item icon={<Cancel />}>Gamma Ray</Menu.Item>
            <Menu.Divider />
            <Menu.Item href="/core-modal">Omega Man</Menu.Item>
          </Menu.List>
        </Card.Content>
      </Card>
    </Group>
  );
}

function Controlled() {
  const [anchorRef, setAnchorRef] = createSignal<HTMLElement>();
  return (
    <Stack gap="xl" w="20rem">
      <Card h="20rem">
        <Card.Content p="1rem">
          <Button
            onClick={e => {
              if (anchorRef()) {
                setAnchorRef(undefined);
              } else {
                setAnchorRef(e.currentTarget);
              }
            }}
          >
            Anchor Element
          </Button>
          <Menu.List
            anchor={anchorRef()}
            onClose={() => {
              setAnchorRef(undefined);
            }}
          >
            <Menu.Item>Alpha Wolf</Menu.Item>
            <Menu.Item>Beta Test</Menu.Item>
            <Menu.Item>Delta Dawn</Menu.Item>
            <Menu.Item>Gamma Ray</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Omega Man</Menu.Item>
          </Menu.List>
        </Card.Content>
      </Card>
    </Stack>
  );
}

function MenuButtonDemo() {
  return (
    <Stack gap="xl" w="20rem">
      <Card h="20rem">
        <Card.Content p="1rem">
          <Menu>
            <Menu.Button>Menu Button</Menu.Button>
            <Menu.List>
              <Menu.Item>Alpha Wolf</Menu.Item>
              <Menu.Item>Beta Test</Menu.Item>
              <Menu.Item>Delta Dawn</Menu.Item>
              <Menu.Item>Gamma Ray</Menu.Item>
              <Menu.Divider />
              <Menu.Item>Omega Man</Menu.Item>
            </Menu.List>
          </Menu>
        </Card.Content>
      </Card>
    </Stack>
  );
}

export default {
  MenuButton: () => <MenuButtonDemo />,
  MenuList: () => <MenuListDemo />,
  Scrolling: () => <ScrollingDemo />,
  Controlled: () => <Controlled />,
};
