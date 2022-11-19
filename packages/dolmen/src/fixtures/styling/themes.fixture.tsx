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
import { createTheme } from '../../styles/css';

export const $category = 'styling';

import { colord } from 'colord';
import { palette } from '../../styles';
import { Cancel, ChevronDown } from '../../icons';
const primaryColor = '#9a7e42';
const dangerColor = '#7d248a';
const textHighlight = '#81665566';

export const custom = createTheme('custom', {
  colors: {
    elevation0: palette.warmgray900,
    elevation1: palette.warmgray850,
    elevation2: palette.warmgray800,

    fieldBg: colord(palette.warmgray850).darken(0.025).toHex(),
    fieldBorder: palette.warmgray500,
    fieldBorderSlight: palette.warmgray750,
    fieldHoverBorder: palette.warmgray700,

    text: palette.warmgray200,
    textDim: palette.warmgray500,
    textSelection: palette.white,
    textSelectionBg: textHighlight,

    itemHoverBg: palette.warmgray800,
    itemFocusBg: palette.warmgray700,
    itemSelectedBg: textHighlight,

    focus: '#8183ff88',
    shadow: palette.black,
    backdrop: colord(palette.black).alpha(0.3).toHex(),

    btnPrimary: primaryColor,
    btnPrimaryText: palette.warmgray50,
    btnPrimaryTextDim: colord(primaryColor).lighten(0.25).toHex(),

    btnSecondary: palette.warmgray750,
    btnSecondaryContrast: palette.warmgray200,
    btnSecondaryContrastDim: palette.warmgray500,

    btnDanger: dangerColor,
    btnDangerText: palette.warmgray100,
    btnDangerTextDim: colord(dangerColor).lighten(0.3).toHex(),

    btnSelected: palette.warmgray600,
    btnSelectedContrast: palette.warmgray100,
    btnSelectedContrastDim: palette.warmgray200,

    scrollbar: colord(palette.warmgray500).alpha(0.3).toHex(),
    scrollbarInactive: colord(palette.warmgray500).alpha(0.15).toHex(),

    sliderFill: palette.warmgray750,

    toggleFill: palette.warmgray700,
    toggleFillChecked: '#118811',
    toggleSlideFill: `linear-gradient(to bottom, ${palette.warmgray100} 0%, ${palette.warmgray300} 100%)`,

    tooltipBg: palette.black,
    tooltipText: palette.warmgray300,

    // To migrate

    knobRim: `linear-gradient(
      to bottom,
      ${colord(palette.warmgray800).lighten(0.1).toHex()} 0,
      ${colord(palette.warmgray800).darken(0.1).toHex()}
    )`,
    knobCenter: `linear-gradient(
      to bottom,
      ${colord(palette.warmgray800).lighten(0.03).toHex()} 0,
      ${colord(palette.warmgray800).darken(0.03).toHex()}
    )`,
  },
});

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
