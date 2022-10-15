# Components

* Slider
* List
* Select
* MenuButton
* Form
* Color Picker
  * GradientSlider
  * Color Swatch
  * HueSaturationSelector
* ToolBar
* ToolPalette
* TextArea
* Radio
* Divided button
* Chip
* Badge
* Tooltip
* Alert
* Toast
* Progress Bar
* Collapse
* FocusTrap
* Divider
* Tabs
* Drawer
* Breadcrumbs
* Card Header / Footer

## Possible

* TreeView
* ComboBox / Autocomplete
* Rich Text

# Codex

* Attribute controls
  * const round = createCheckboxParam(false)
  * const gap = createEnumBar(['xl', 'lg', 'md', 'sm', 'xs'])
  * Need:
    * Slider
    * Drawer
    * Select

# Other

* Prism support
* Tree view collapse
* Tree view highlight
* Tree view expand
* Hi-res favicons in manifest
* Z-index constants.
* Make toggle less skeumorphic.

# Drawer

  * Floating or Anchored / Inplace / Ensconsed /
  * Leave sliver
  * left, right, top, bottom

# Params

const params = createFixtureParams({
  marginWidth: { type: 'boolean', caption: 'Margin width', min: 0 },
  marginHeigt: { type: 'boolean', caption: 'Margin height', min: 0 },
});

params.marginWidth()
params.marginWidth(value)
params.marginWidth.param
