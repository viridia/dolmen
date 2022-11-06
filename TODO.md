# Components

* Input
  * readonly
  * success field message.
* TableGrid
* Slider
  * Marks (redo?)
  * Vertical
  * Quantization
* Radio / RadioGroup
* Divided button
* Chip
* Select
  * Test events
  * Test form submit
* Menu
  * Shortcuts
  * Submenus
  * forward ref
  * Prefix navigation
* Color Picker
  * GradientSlider
  * Color Swatch
  * HueSaturationSelector
* Color Grid - redo as radio buttons.
* Tabs
* Pagination
* Breadcrumbs (incomplete - need links)
* Toast
* Snackbar
* Progress Bar
* Collapse
* Divider
* ToolBar
* ToolPalette

## Possible

* TreeView
* ComboBox / Autocomplete

* Rich Text
  * Serialization
  * Deserialization
  * Lists
  * Codeblocks
  * Checkbox lists with attributes.
  * Images / SVG
  * Formulas

# Codex

* Attribute controls
  * const gap = createEnumBar(['xl', 'lg', 'md', 'sm', 'xs'])
  * Need:
    * Select
    * Radio?
    * Vertical button group?
* Event listeners / log

# Other

* Move Knob to its own package.
  * Figure out how we are going to handle theming in that case.
* Prism support
* Fixture for createFocusTrap
* Tree view collapse
* Tree view highlight
* Tree view expand
* Hi-res favicons in manifest
* Form submission tests:
  * Select
  * Checkbox
  * Toggle
  * Input
* Button busy state.

## Drawer

  * Leave sliver
  * Fixture for minWidth
  * Firefox bugs

## Style props to do

lineHeight

top
right
bottom
left

gridTemplateColumns
gridTemplateRows
gridGap

inset

letterSpacing

# Unresolved issues with Solid

* Client-only rendering:
  * properties panel
  * tree expansion state
  * SSR in general makes design hard

<!-- export default function Root() {

  useAssets(() => <style id="stitches" innerHTML={getCssText()} $ServerOnly />)); -->
