import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';

export function createLocalStorageStore<T extends Record<string, unknown>>(
  storeName: string,
  initialValue?: T
) {
  if (!isServer) {
    const json = localStorage.getItem(storeName);
    if (json) {
      try {
        const parsed = JSON.parse(json);
        if (typeof parsed === 'object') {
          initialValue = parsed;
        }
      } catch (e) {
        console.error(`Malformed data for local storage key "${storeName}".`);
      }
    }
  }

  const store = createStore<T>(initialValue);

  if (!isServer) {
    const [storeValue] = store;
    createEffect(() => {
      localStorage.setItem(storeName, JSON.stringify(storeValue));
    });
  }

  return store;
}
