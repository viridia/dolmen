Icons in this folder are taken from freely-licensed sources.
They have been modified (manually) to change the fill color to the CSS variable --icon-color.

The build:svg script converts these icons to Solid components, allowing the SVG to be inlined
into the HTML. This is generally more efficient (bandwidth-wise) than using icon fonts or
image urls.

Note that these icons are not meant to be part of the public API, and are only meant for
Dolmen widgets (such as close buttons) that require a specific icon.
