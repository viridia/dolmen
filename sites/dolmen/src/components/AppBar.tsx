import { Button, Page, Spacer } from 'dolmen';
import { Show } from 'solid-js';
import { DarkMode, GithubMark, LightMode } from '../icons';
import { useUserSettings } from '../settings';

export default () => {
  const [settings, setSettings] = useUserSettings();

  return (
    <Page.Header gap="md">
      <Page.Title>Dolmen</Page.Title>
      <Spacer />
      <Button
        icon
        color="subtle"
        aria-label={settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        onClick={() => {
          setSettings(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }));
        }}
      >
        <Show when={settings.theme === 'dark'} fallback={<LightMode />}>
          <DarkMode />
        </Show>
      </Button>
      <Button.Link icon color="subtle" target="new" href="https://github.com/viridia/dolmen">
        <GithubMark width={24} />
      </Button.Link>
    </Page.Header>
  );
};
