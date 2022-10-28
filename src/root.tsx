// @refresh reload
import { App } from 'solid-codex';
// import { fixtureModules } from 'dolmen/fixtures';

const fixtureModules = import.meta.glob([
  '/packages/dolmen/src/fixtures/**/*.fixture.tsx',
  '/packages/dolmen-knob/**/*.fixture.tsx',
]);

export default function Root() {
  return <App fixtures={fixtureModules} />;
}
