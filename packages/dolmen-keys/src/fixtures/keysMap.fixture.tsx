import { For } from 'solid-js';
import { KeyCode } from '../KeyCodes';
import { KeysManager } from '../KeysManager';

export const $category = 'dolmen-keys';

function KeysMapDemo() {
  const keys = new KeysManager();

  return (
    <div>
      <code>
        <pre>
          <For each={Object.keys(keys.activeKeys)}>
            {key => (
              <div>
                {key}: {`${keys.activeKeys[key as KeyCode]}`}
              </div>
            )}
          </For>
        </pre>
      </code>
    </div>
  );
}

export default () => <KeysMapDemo />;
