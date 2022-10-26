// @refresh reload
import { createResource, JSX } from 'solid-js';

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
  $name?: string;
}

export const useFixtures = (modules: Record<string, () => Promise<unknown>>) => {
  // console.log(modules);
  const [fixtures] = createResource(
    async () => {
      const uniquePaths = new Set<string>();
      const getUniquePath = (...names: string[]) => {
        const stem = names.join('-').toLowerCase().replaceAll(' ', '-');
        let result = stem;
        let index = 0;
        while (uniquePaths.has(result)) {
          result = `${stem}${++index}`;
        }
        return result;
      };
      const result: IFixture[] = [];
      for (const path of Object.keys(modules)) {
        const mod = (await modules[path]()) as FixtureModule;
        const factory = mod.default;
        const category = mod.$category?.split('/') ?? [];
        let name = path;
        const m = /.*\/(.*?)\.fixture\.tsx/.exec(name);
        if (m) {
          name = m[1];
        }
        if (mod.$name) {
          name = mod.$name;
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
    },
    {
      deferStream: true,
    }
  );

  return fixtures;
};
