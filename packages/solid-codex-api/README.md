The reason this code is in a separate subpackage is to break a circular dependency
between the UI toolkit and Codex - Codex uses the UI widgets, but is also used to
develop the UI widgets.
