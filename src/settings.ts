import { createContext, createEffect, useContext } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { parseCookie, ServerContext } from 'solid-start';

export interface ISettings {
  theme?: string;
  displayMode: 'canvas' | 'source';
}

export const UserSettingsContext =
  createContext<[get: Store<ISettings>, set: SetStoreFunction<ISettings>]>();

export const useUserSettings = () => useContext(UserSettingsContext);

export const createUserSettings = () => {
  // Initialize store from cookie (server or client).
  let cookie: string;
  if (isServer) {
    const event = useContext(ServerContext);
    cookie = event.request.headers.get('Cookie');
  } else {
    cookie = document.cookie;
  }

  let initialValue: ISettings = { displayMode: 'canvas' };
  try {
    const cookieValue = parseCookie(cookie)?.settings;
    if (typeof cookieValue === 'string') {
      const parsed = JSON.parse(cookieValue);
      if (typeof parsed === 'object') {
        initialValue = parsed;
      }
    }
  } catch (e) {}

  const store = createStore<ISettings>(initialValue);

  // Create an effect which updates document.cookie when the store is mutated.
  if (!isServer) {
    const [storeValue] = store;
    createEffect(() => {
      document.cookie = `settings=${JSON.stringify(storeValue)}`;
    });
  }

  return store;
};
