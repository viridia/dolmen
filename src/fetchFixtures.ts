// @refresh reload
import { JSX } from 'solid-js';

const fixtureModules = import.meta.glob('dolmen/**/*.fixture.tsx');

export interface IFixture {
  /** Display name of the fixture */
  name: string;

  /** Path to source module containing the fixture. */
  path: string;

  /** For modules containing multiple fixtures, the name of the property used to get it. */
  propertyKey?: string;

  /** Hierarchical category shown in tree view. */
  category: string[];

  /** id displayed in url. */
  urlPath: string;
}

type FixtureFn = () => JSX.Element;

interface FixtureModule {
  default: FixtureFn | Record<string, FixtureFn>;
  $category?: string;
}

export async function listFixtures() {
  const uniquePaths = new Set<string>();
  const getUniquePath = (...names: string[]) => {
    const stem = names.join('-').toLowerCase().replace(' ', '-');
    let result = stem;
    let index = 0;
    while (uniquePaths.has(result)) {
      result = `${stem}${++index}`;
    }
    return result;
  };
  const result: IFixture[] = [];
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
          propertyKey: submod,
          category: [...category, name],
          path,
          urlPath: getUniquePath(...category, name, submod),
        });
      });
    } else if (typeof factory === 'function') {
      result.push({
        name,
        path,
        urlPath: getUniquePath(...category, name),
        category,
      });
    }
  }
  return result;
}
