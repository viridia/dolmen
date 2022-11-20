// @refresh reload
import { Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Route, Routes, Scripts, Title } from 'solid-start';
import { createCodex, CodexContext } from 'solid-codex-api';
import { useFixtures } from '../data/fixtures';
import { createUserSettings, UserSettingsContext } from '../settings';
import { CodexPage } from './CodexPage';
import styles from 'dolmen/css/styles.css?raw';
import lightTheme from 'dolmen/css/theme/light.css?raw';
import darkTheme from 'dolmen/css/theme/dark.css?raw';
import { rootCss } from './styles.css';

export function App(props: { fixtures: Record<string, () => Promise<unknown>> }) {
  const fixtures = useFixtures(props.fixtures);
  const userSettings = createUserSettings();
  const fixtureParams = createCodex();

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <CodexContext.Provider value={fixtureParams}>
        <Html lang="en" class={rootCss}>
          <Head>
            <Title>SolidStart - With MDX</Title>
            <Meta charset="utf-8" />
            <Meta name="viewport" content="width=device-width, initial-scale=1" />
            <style innerHTML={styles} />
            <style innerHTML={lightTheme} />
            <style innerHTML={darkTheme} />
          </Head>
          <Body
            classList={{
              [userSettings[0].theme === 'dark' ? 'dm-theme-dark' : 'dm-theme-light']: true,
            }}
          >
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
      </CodexContext.Provider>
    </UserSettingsContext.Provider>
  );
}
