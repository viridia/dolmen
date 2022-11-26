import { createActiveKeys } from '../createActiveKeys';
import { KeysManager, KeysManagerContext } from '../KeysManager';

export const $category = 'dolmen-keys';

function ActiveKeysDemo() {
  const st = createActiveKeys({
    zoomIn: '[',
    zoomOut: ']',
    strafeLeft: ['shift+a', 'shift+left'],
    strafeRight: ['shift+d', 'shift+right'],
    left: ['a', 'left'],
    right: ['d', 'right'],
    forward: ['w', 'up'],
    back: ['s', 'down'],
  });

  // const click = codex.action('click');
  return (
    <div>
      <ul>
        <li>zoomIn: {`${st.zoomIn}`}</li>
        <li>zoomOut: {`${st.zoomOut}`}</li>
        <li>left: {`${st.left}`}</li>
        <li>right: {`${st.right}`}</li>
        <li>forward: {`${st.forward}`}</li>
        <li>back: {`${st.back}`}</li>
        <li>strafe left: {`${st.strafeLeft}`}</li>
        <li>strafe right: {`${st.strafeRight}`}</li>
      </ul>
    </div>
  );
}

export default () => (
  <KeysManagerContext.Provider value={new KeysManager()}>
    <ActiveKeysDemo />
  </KeysManagerContext.Provider>
);
