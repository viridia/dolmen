import { createContext, useContext } from 'solid-js';
import { SetStoreFunction, Store } from 'solid-js/store';
import { createCookieStore } from './data/cookieStore';

export interface ISettings {
  theme?: string;
  displayMode: 'canvas' | 'source';
}

export const UserSettingsContext =
  createContext<[get: Store<ISettings>, set: SetStoreFunction<ISettings>]>();

export const useUserSettings = () => useContext(UserSettingsContext);

export const createUserSettings = () =>
  createCookieStore<ISettings>('settings', { displayMode: 'canvas' });
