// @refresh reload
import { JSX } from 'solid-js';

const fixtureModules = import.meta.glob('dolmen/**/*.fixture.tsx');

export interface IFixtureGroup {
  name: string;
  path: string;
  key?: string;
  category: string[];
}

type FixtureFn = () => JSX.Element;

interface FixtureModule {
  default: FixtureFn | Record<string, FixtureFn>;
  $category?: string;
}

export async function listFixtures() {
  const result: IFixtureGroup[] = [];
  for (const path of Object.keys(fixtureModules)) {
    const mod = (await fixtureModules[path]()) as FixtureModule;
    const factory = mod.default;
    const category = mod.$category?.split('/') ?? [];
    let name = path;
    const m = /.*\/(.*?)\.fixture\.tsx/.exec(name);
    if (m) {
      name = m[1];
    }
    if (typeof factory === 'object') {
      Object.keys(factory).forEach(submod => {
        result.push({
          name: submod,
          key: submod,
          category: [...category, name],
          path,
        });
      });
    } else if (typeof factory === 'function') {
      result.push({
        name,
        path,
        category,
      });
    }
  }
  return result;
}
