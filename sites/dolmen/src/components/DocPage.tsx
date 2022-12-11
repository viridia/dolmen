import { useLocation } from '@solidjs/router';
import { Page } from 'dolmen';
import { createEffect, createSignal, VoidComponent } from 'solid-js';
import { Outlet } from 'solid-start';
import AppBar from '../components/AppBar';
import { DocNav } from '../components/mdx';
import { NavPanel } from '../components/NavPanel';
import styles from './DocPage.module.scss';

export const DocPage: VoidComponent = () => {
  const [docElt, setDocElt] = createSignal<HTMLElement | undefined>();
  const location = useLocation();

  createEffect(() => {
    const elt = docElt();
    if (elt && location.pathname) {
      elt.scroll({
        left: 0,
        top: 0,
      });
    }
  });

  return (
    <Page>
      <AppBar />
      <Page.Content class={styles.main} as="main" flexDirection="row" p="none">
        <NavPanel />
        <Page.Content class={styles.docs} ref={setDocElt}>
          <div class={styles.docsContent}>
            <Outlet />
            <DocNav />
          </div>
        </Page.Content>
      </Page.Content>
    </Page>
  );
};
