// @refresh reload
import { createResource, Suspense, useContext } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Scripts, ServerContext, Title } from 'solid-start';
import { light, dark } from 'dolmen';
import { listFixtures } from './listFixtures';
import { CodexPage } from './components/CodexPage';
import { createUserSettings, UserSettingsContext } from './settings';
import { isServer } from 'solid-js/web';

export default function Root() {
  const [fixtures] = createResource(listFixtures, {
    deferStream: true,
  });

  const userSettings = createUserSettings();

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <Html lang="en" class={userSettings[0].theme === 'dark' ? dark : light}>
        <Head>
          <Title>SolidStart - With MDX</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body>
          <ErrorBoundary>
            <Suspense>
              <CodexPage fixtures={fixtures} />
            </Suspense>
          </ErrorBoundary>
          <Scripts />
        </Body>
      </Html>
    </UserSettingsContext.Provider>
  );
}
