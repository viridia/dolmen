// @refresh reload
import { Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Route, Routes, Scripts, Title } from 'solid-start';
import { light, dark } from 'dolmen';
import { CodexPage } from './components/CodexPage';
import { createUserSettings, UserSettingsContext } from './settings';
import { useFixtures } from './data/fixtures';

const fixtureModules = import.meta.glob('dolmen/**/*.fixture.tsx');

export default function Root() {
  const fixtures = useFixtures(fixtureModules);
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
              <Routes>
                <Route path="/:fixture?/*" component={() => <CodexPage fixtures={fixtures} />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Scripts />
        </Body>
      </Html>
    </UserSettingsContext.Provider>
  );
}
