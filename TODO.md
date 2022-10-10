# Components

* Dialog
* Slider
* Knob
* Toggle
* DisclosureTriangle
* CloseButton
* List
* Select
* MenuButton
* Form
* GradientSlider
* ToolBar
* ToolPalette
* TextArea
* Checkbox
* Radio
* Code
* Paragraph
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

## Possible

* TreeView
* ComboBox / Autocomplete
* Rich Text

# Hooks

* createCssTransition
* pointerDrag

# Codex

* Attribute controls
  * const round = createCheckboxParam(false)
  * const gap = createEnumBar(['xl', 'lg', 'md', 'sm', 'xs'])

# Other

* Dark mode persistence
* URL routing
* Tree view collapse
* Tree view highlight
* Tree view scroll
* Tree view expand
* Hi-res favicons

```ts
// html:not(.dark) {
//   --input-bg: #{$g5};
//   --input-text: #{$g80};
//   --input-border: #{$g10};
//   --input-hover-border: #{$g15};
//   --input-selection-bg: #{$textHighlight};
//   --input-selection-text: black;
//   --input-icon-color: #{$g30};

//   --drawer-bg: #{$g0};
//   --drawer-shadow: #{$g40};
//   --drawer-drag-bg: #{$g10};
// }

// html.dark {
//   --input-bg: #{$cg90};
//   --input-text: #{$cg20};
//   --input-border: #000;
//   --input-hover-border: #{$cg70};
//   --input-selection-bg: #{$textHighlight};
//   --input-selection-text: white;
//   --input-icon-color: #{$cg60};

//   --drawer-bg: #{$cg80};
//   --drawer-shadow: #000;
//   --drawer-drag-bg: #{$g30};
// }
```
