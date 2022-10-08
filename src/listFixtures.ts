// @refresh reload
import { JSX } from 'solid-js';

const fixtureModules = import.meta.glob('dolmen/**/*.fixture.tsx', {
  import: 'default',
});

export interface IFixtureGroup {
  name: string;
  path: string;
  key?: string;
  children?: IFixtureGroup[];
}

type FixtureModule =
  | JSX.Element
  | (() => JSX.Element)
  | Record<string, JSX.Element | (() => JSX.Element)>;

export async function listFixtures() {
  const result: IFixtureGroup[] = [];
  for (const path of Object.keys(fixtureModules)) {
    const mod = (await fixtureModules[path]()) as FixtureModule;
    let name = path;
    const m = /.*\/(.*?)\.fixture\.tsx/.exec(name);
    if (m) {
      name = m[1];
    }
    if (typeof mod === 'object') {
      const group: IFixtureGroup = {
        name,
        path,
        children: [],
      };
      Object.keys(mod).forEach(submod => {
        group.children.push({
          name: submod,
          key: submod,
          path,
        });
      });
      result.push(group);
    } else if (typeof mod === 'function') {
      result.push({
        name,
        path,
      });
    }
  }
  return result;
}
