import { createSignal, VoidComponent } from 'solid-js';
import {
  Button,
  ButtonGroup,
  Card,
  CheckBox,
  Group,
  Input,
  List,
  Menu,
  Slider,
  Spacer,
  Header,
  ToggleSwitch,
} from '../../components';
import './warm.scss';

export const $category = 'styling';

import { Cancel, ChevronDown } from '../../icons';

const ThemeDemo: VoidComponent<{ name: string; class: string }> = props => {
  const [sliderValue, setSliderValue] = createSignal(30);
  const [anchorRef, setAnchorRef] = createSignal<HTMLElement>();
  return (
    <Card style={{ flex: 1 }} class={props.class}>
      <Card.Content gap="lg">
        <Header>{props.name}</Header>
        <Group gap="md">
          <ButtonGroup>
            <Button>Iron</Button>
            <Button>Gold</Button>
            <Button>Carbon</Button>
          </ButtonGroup>
          <Spacer />
          <Button color="primary">Transmute</Button>
        </Group>
        <CheckBox>Mass</CheckBox>
        <ToggleSwitch>Spin</ToggleSwitch>
        <Slider
          value={sliderValue()}
          min={0}
          max={100}
          step={1}
          onChange={value => setSliderValue(value)}
          valueLabelDisplay="auto"
        />
        <Input placeholder="Enter name..." adornRight={<Cancel />} />
        <List>
          <List.Item selected>Snap</List.Item>
          <List.Item>Crackle</List.Item>
          <List.Item>Pop</List.Item>
        </List>
        <Button ref={setAnchorRef} style={{ width: '10rem' }}>
          Menu
          <Spacer />
          <ChevronDown />
        </Button>
        <Menu.List anchor={anchorRef()} inset>
          <Menu.Item>One</Menu.Item>
          <Menu.ItemCheckBox checked>Two</Menu.ItemCheckBox>
          <Menu.Item disabled>Three</Menu.Item>
          <Menu.Divider />
          <Menu.Item>Four</Menu.Item>
        </Menu.List>
      </Card.Content>
    </Card>
  );
};

export const Themes: VoidComponent = () => {
  return (
    <Group style={{ flex: 1, 'align-items': 'stretch', 'align-self': 'stretch' }} gap="xl">
      <ThemeDemo name="Light" class="dm-theme-light" />
      <ThemeDemo name="Dark" class="dm-theme-dark" />
      <ThemeDemo name="Custom" class="dm-theme-warm" />
    </Group>
  );
};

export default Themes;
