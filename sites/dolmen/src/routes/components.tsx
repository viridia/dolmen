import { Button, Page, Spacer } from 'dolmen';
import { Show } from 'solid-js';
import { Outlet } from 'solid-start';
import { NavPanel } from '../components/NavPanel';
import { DarkMode, LightMode } from '../icons';
import { useUserSettings } from '../settings';
import styles from './styles.module.scss';

export default () => {
  const [settings, setSettings] = useUserSettings();

  return (
    <Page>
      <Page.Header>
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
      </Page.Header>
      <Page.Content as="main" flexDirection="row" p="none">
        <NavPanel />
        <Page.Content class={styles.docs}>
          <Outlet />
        </Page.Content>
      </Page.Content>
    </Page>
  );
};
