// @refresh reload
import { createEffect, Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Route, Routes, Scripts, Title } from 'solid-start';
import { theme } from 'dolmen';
import { createFixtureParamsStore, FixtureParamsContext } from 'solid-codex-api';
import { getCssText } from 'dolmen';
import { useFixtures } from '../data/fixtures';
import { createUserSettings, UserSettingsContext } from '../settings';
import { CodexPage } from './CodexPage';

export function App(props: { fixtures: Record<string, () => Promise<unknown>> }) {
  const fixtures = useFixtures(props.fixtures);
  const userSettings = createUserSettings();
  const fixtureParams = createFixtureParamsStore();

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <FixtureParamsContext.Provider value={fixtureParams}>
        <Html lang="en">
          <Head>
            <Title>SolidStart - With MDX</Title>
            <Meta charset="utf-8" />
            <Meta name="viewport" content="width=device-width, initial-scale=1" />
            <style id="stitches" innerHTML={getCssText()} />
          </Head>
          <Body classList={{ [theme.dark.className]: userSettings[0].theme === 'dark' }}>
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
      </FixtureParamsContext.Provider>
    </UserSettingsContext.Provider>
  );
}
