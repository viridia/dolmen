// @refresh reload
import { App } from 'solid-codex';
// import { fixtureModules } from 'dolmen/fixtures';

const fixtureModules = import.meta.glob('#fixtures/**/*.fixture.tsx');

export default function Root() {
  return <App fixtures={fixtureModules} />;
}
