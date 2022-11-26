import { KeysManagerContext, ShortcutMap } from './KeysManager';
import equals from 'fast-deep-equal';
import { convertKeyNameToKeyCode } from './keyNames';
import { createEffect, createSignal, onCleanup, useContext } from 'solid-js';

type Callback = (e: KeyboardEvent) => void;

type KeyMap<T extends object> = {
  [key in keyof T]: Callback;
};

const modifiers: { [key: string]: boolean } = {
  shift: true,
  ctrl: true,
  alt: true,
  meta: true,
};

/** @visibleForTesting */
export function createShortcutMap(inputMap: { [key: string]: Callback }) {
  const shortcutMap: ShortcutMap = {};

  // Build shortcut entry map
  Object.getOwnPropertyNames(inputMap).forEach(combo => {
    const callback = inputMap[combo]!;
    const keyNames = combo.trim().split(/\+/);
    const mods = keyNames
      .filter(keyName => modifiers[keyName])
      .sort()
      .join('+');
    const nonMods = keyNames.filter(keyName => !modifiers[keyName]);
    if (nonMods.length !== 1) {
      console.error(`Invalid key combo: ${combo}`);
      return;
    }

    const triggerKey = convertKeyNameToKeyCode(nonMods[0]);
    if (!triggerKey) {
      console.error(`Invalid key name: ${nonMods[0]}`);
      return;
    }

    const mapEntry = shortcutMap[triggerKey];
    if (mapEntry) {
      mapEntry.push({ modifiers: mods, callback });
    } else {
      shortcutMap[triggerKey] = [{ modifiers: mods, callback }];
    }
  });

  return shortcutMap;
}

const EMPTY_MAP = {};

/** Hook function which registers a collection of keyboard shortcuts and associated callbacks.
    This is intended to be used in conjunction with ActiveKeys, however it provides a more
    traditional function of mapping individual key press events to callback functions.

    The input parameter is a map whose keys are a keyboard combo string such as 'shift+x',
    and whose values are the callback to be invoked when that key combo is pressed.
 */
export const createShortcuts = <T extends object>(
  shortcuts: KeyMap<T>,
  modal = false,
  enabled = true
) => {
  const mgr = useContext(KeysManagerContext);
  const [currentMap, setCurrentMap] = createSignal<KeyMap<T>>(EMPTY_MAP as KeyMap<T>);

  // Memoize map: prevent keymaps from being unbound and rebound on every render.
  createEffect(() => {
    if (!enabled) {
      setCurrentMap(() => EMPTY_MAP as KeyMap<T>);
    } else if (!equals(shortcuts, currentMap())) {
      setCurrentMap(() => shortcuts);
    }
  }, [shortcuts, currentMap, enabled]);

  // Build map of shortcut key names and modifiers.
  createEffect(() => {
    const shortcuts = createShortcutMap(currentMap());
    if (Object.keys(shortcuts).length > 0) {
      onCleanup(mgr.push({ shortcuts, modal }));
    }
  }, [currentMap, mgr, modal]);
};
