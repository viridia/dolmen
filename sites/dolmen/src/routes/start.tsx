import { Page } from 'dolmen';
import { Outlet } from 'solid-start';
import AppBar from '../components/AppBar';
import { NavPanel } from '../components/NavPanel';
import styles from './styles.module.scss';

export default () => {
  return (
    <Page>
      <AppBar />
      <Page.Content class={styles.main} as="main" flexDirection="row" p="none">
        <NavPanel />
        <Page.Content class={styles.docs}>
          <Outlet />
        </Page.Content>
      </Page.Content>
    </Page>
  );
};
