# dolmen-keys

This package contains a number of useful modules for keyboard handling in games and 3D applications
using Solid.js.

Typically in a game, keys are used as real-time control signals. A particular movement or action,
such as moving forward or turning left, will be performed continuously for as long as a key is
held down. Moreover, these actions are often assigned to key combinations, such as "shift+left
to strafe left".

These methods require a KeysManagerContext:

```ts
<KeysManagerContext.Provider value={new KeysManager()}>
  {...}
</KeysManagerContext.Provider>
```

The `KeysManager.activeKeys` property returns an object that has a boolean flag for each keyboard
key that is currently held down. This is a reactive store.

## `createActiveKeys`

The `createActiveKeys` hook allows key combinations to be mapped to a set of boolean signals. It
includes logic to normalize the modifier keys - so you can listen for `shift`, `left-shift`,
`right-shift` and so on.

```ts
const cameraControls = createActiveKeys({
  strafeLeft: 'shift+left',
  strafeRight: 'shift+right',
  rotateLeft: 'left',
  rotateRight: 'right',
  moveForward: 'up',
  moveBack: 'down',
});
```

The return result is a reactive store which has a property for each of the named signals.

```ts
function animate() {
  if (keys.strafeLeft) {
    // update position
  }

  if (keys.rotateLeft) {
    // etc.
  }
}
```

There is an exclusion algorithm which prevents multiple signals using the same base key from
being triggered simultaneously. The 'base key' is the rightmost key in the key combo string,
so for example in the combo 'shift-a' the base key is 'a'. If multiple signals are defined using
the same base key, only one of those signals can be active at a time.

Under the exclusion rule, key combos defined earlier in the map take precedence over those defined
later. So in the above example, both 'strafeLeft' and 'rotateLeft' have the same base key, 'left'.
Pressing 'shift+left' will activate the 'strafeLeft' signal only. Pressing 'left' without shift
will activate only the 'rotateLeft' signal. This works regardless of the order in which the keys
are pressed, so if 'shift' is pressed while already holding down 'left', the activated signal will
change from 'rotateLeft' to 'strafeLeft'.

Because of this, you will generally want to put the more complex key combinations first, so that
they take precedence over combinations with fewer keys.

## `createShortcuts`

The `createShortcuts` hook allows you to listen for keypresses instead of held keys.

These functions can be used together in the following way:

```ts
createShortcuts({
  'ctrl+z': onUndo,
  'meta+z': onUndo,
  esc: onCancelDrag,
});

// Now use cameraControls.strafeLeft, etc.;
```
