// @refresh reload
import { Suspense } from 'solid-js';
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import 'dolmen/css/styles.css';
import 'dolmen/css/theme/light.css';
import 'dolmen/css/theme/dark.css';
import './root.scss';
import { createUserSettings, UserSettingsContext } from './settings';

export default function Root() {
  const userSettings = createUserSettings();

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <Html lang="en">
        <Head>
          <Title>SolidStart - With MDX</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body
          classList={{
            [userSettings[0].theme === 'dark' ? 'dm-theme-dark' : 'dm-theme-light']: true,
          }}
        >
          <ErrorBoundary>
            <A href="/">Index</A>
            <A href="/about">About</A>
            <Suspense>
              <Routes>
                <FileRoutes />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Scripts />
        </Body>
      </Html>
    </UserSettingsContext.Provider>
  );
}
