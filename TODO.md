# Components

* MenuButton
  * Shortcuts
  * Submenus
  * forward ref
* Slider
  * Marks
  * Vertical
  * Quanta
* Select
* Form
* Color Picker
  * GradientSlider
  * Color Swatch
  * HueSaturationSelector
* ToolBar
* ToolPalette
* TextArea
* Radio / RadioGroup
* Divided button
* Chip
* Badge
* Alert
* Toast
* Progress Bar
* Collapse
* Divider
* Tabs
* Breadcrumbs (incomplete)
* Pagination

## Possible

* TreeView
* ComboBox / Autocomplete
* Rich Text

# Codex

* Attribute controls
  * const gap = createEnumBar(['xl', 'lg', 'md', 'sm', 'xs'])
  * Need:
    * Select
    * Radio?
    * Vertical button group?

# Other

* Prism support
* Tree view collapse
* Tree view highlight
* Tree view expand
* Hi-res favicons in manifest
* Make toggle less skeumorphic.
* Fixture for createFocusTrap
* Split pane with more than 2 panels - should be doable.
* Way too many theme variables - need to reduce by at least 50%.

# Drawer

  * Leave sliver
  * Fixture for minWidth
  * Firefox bugs

```tsx
<Menu>
  <Menu.Button>Button</Menu.Button>
  <Menu.List>
    <Menu.Item></Menu.Item>
    <Menu.CheckboxItem></Menu.CheckboxItem>
    <Menu.RadioItem></Menu.RadioItem>
    <Menu.SubmenuItem></Menu.SubmenuItem>
    <Menu.Divider />
  </Menu.List>
</Menu>

<Select>
  <Option value={true} caption disabled>
</Select>
```
