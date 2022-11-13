// @refresh reload
import { Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Route, Routes, Scripts, Title } from 'solid-start';
import { css, dark } from 'dolmen';
import { createCodex, CodexContext } from 'solid-codex-api';
import { getCssText, globalStyles } from 'dolmen';
import { useFixtures } from '../data/fixtures';
import { createUserSettings, UserSettingsContext } from '../settings';
import { CodexPage } from './CodexPage';

const rootCss = css({
  fontSize: '14px',
});

export function App(props: { fixtures: Record<string, () => Promise<unknown>> }) {
  const fixtures = useFixtures(props.fixtures);
  const userSettings = createUserSettings();
  const fixtureParams = createCodex();

  globalStyles();

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <CodexContext.Provider value={fixtureParams}>
        <Html lang="en" class={rootCss()}>
          <Head>
            <Title>SolidStart - With MDX</Title>
            <Meta charset="utf-8" />
            <Meta name="viewport" content="width=device-width, initial-scale=1" />
            <style id="stitches" innerHTML={getCssText()} />
          </Head>
          <Body classList={{ [dark.className]: userSettings[0].theme === 'dark' }}>
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
