import { createCookieStorage } from '@solid-primitives/storage';

export interface ISettings {
  theme?: string;
  source?: boolean;
}

export const [settings, setSettings] = createCookieStorage({
  serializer: (value: ISettings) => JSON.stringify(value),
  deserializer: json => {
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  },
});
