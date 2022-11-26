import { useCodex } from 'solid-codex-api';
import { createShortcuts } from '../createShortcuts';
import { KeysManager, KeysManagerContext } from '../KeysManager';

export const $category = 'dolmen-keys';

function ShortcutsDemo() {
  const codex = useCodex();

  createShortcuts({
    w: () => {
      codex.log('w');
    },
    a: () => {
      codex.log('a');
    },
    z: () => {
      codex.log('z');
    },
    'shift+w': () => {
      codex.log('shift+w');
    },
    'shift+z': () => {
      codex.log('shift+z');
    },
    'ctrl+a': () => {
      codex.log('ctrl+a');
    },
    'ctrl+z': () => {
      codex.log('ctrl+z');
    },
    'meta+a': () => {
      codex.log('meta+a');
    },
    'alt+z': () => {
      codex.log('alt+z');
    },
    'meta+z': () => {
      codex.log('meta+z');
    },
  });

  // const click = codex.action('click');
  return <div>
    Type one of:
    <ul>
      <li>w</li>
      <li>a</li>
      <li>z</li>
      <li>ctrl+a</li>
      <li>ctrl+z</li>
      <li>command+z</li>
    </ul>
  </div>;
}

export default () => (
  <KeysManagerContext.Provider value={new KeysManager()}>
    <ShortcutsDemo />
  </KeysManagerContext.Provider>
);
