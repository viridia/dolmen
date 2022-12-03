import { Page } from 'dolmen';
import { Outlet } from 'solid-start';
import AppBar from '../components/AppBar';

export default () => {
  return (
    <Page>
      <AppBar />
      <Page.Content as="main" flexDirection="row" p="none">
        <Outlet />
      </Page.Content>
    </Page>
  );
};
