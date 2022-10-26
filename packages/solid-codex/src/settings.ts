import { createContext, useContext } from 'solid-js';
import { SetStoreFunction, Store } from 'solid-js/store';
import { createCookieStore } from './data/createCookieStore';

export interface ISettings {
  theme?: string;
  displayMode: 'canvas' | 'source';
  showAdjust?: boolean;
}

export const UserSettingsContext =
  createContext<[get: Store<ISettings>, set: SetStoreFunction<ISettings>]>();

export const useUserSettings = () => {
  const settings = useContext(UserSettingsContext);
  if (!settings) {
    throw new Error('Missing context: UserSettings');
  }
  return settings;
};

export const createUserSettings = () =>
  createCookieStore<ISettings>('settings', { displayMode: 'canvas' });
