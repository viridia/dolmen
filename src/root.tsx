// @refresh reload
import { createResource, Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Scripts, Title } from 'solid-start';
import { light, dark } from 'dolmen';
import { listFixtures } from './listFixtures';
import { CodexPage } from './components/CodexPage';
import { darkMode } from './darkMode';

export default function Root() {
  const [fixtures] = createResource(listFixtures, {
    deferStream: true,
  });

  return (
    <Html lang="en" class={darkMode() ? dark : light}>
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
  );
}
