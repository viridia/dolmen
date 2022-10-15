import { createContext, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

interface IParamBoolean {
  type: 'boolean';
  caption?: string;
  default?: boolean;
}

interface IParamString {
  type: 'string';
  caption?: string;
  default?: string;
  enumVals?: string[];
}

interface IParamInteger {
  type: 'integer';
  caption?: string;
  default?: number;
  minVal?: number;
  maxVal?: number;
}

interface IParamFloat {
  type: 'float';
  caption?: string;
  default?: number;
  minVal?: number;
  maxVal?: number;
  precision?: number;
}

type AnyParam = IParamBoolean | IParamString | IParamInteger | IParamFloat;
type ParamType<T extends AnyParam> = T extends IParamBoolean
  ? boolean
  : T extends IParamString
  ? string
  : T extends IParamInteger | IParamFloat
  ? number
  : never;

type ParamGetter<T> = () => T;
type ParamSetter<T> = (value: T) => void;
type ParamAccessor<T> = ParamGetter<T> & ParamSetter<T> & { type: AnyParam };

type ParamAccessors<T extends { [key: string]: AnyParam }> = {
  [key in keyof T]: ParamAccessor<ParamType<T[key]>>;
};

/** Context for defining fixture parameters. */
export interface IFixtureParams {
  /** Remove all parameter definitions from the store. */
  clear(): void;

  /** Reset all parameters to their default values. */
  reset(): void;

  /** Add a new parameter, and return an accessor of the value of that parameter. */
  createParams<T extends { [key: string]: AnyParam }>(params: T): ParamAccessors<T>;

  /** Return the keys of all defined parameters. */
  keys(): ReadonlyArray<string>;

  /** Return the list of all parameter accessors. */
  list(): ReadonlyArray<ParamAccessor<unknown>>;

  /** Get the accessors for the given parameter. */
  getParam(key: string): ParamAccessor<unknown>;
}

interface IFixtureParamsStore {
  params: Record<string, ParamAccessor<unknown>>;
  state: Record<string, boolean | string | number>;
}

export const FixtureParamsContext = createContext<IFixtureParams>();

export const useFixtureParamsContext = () => useContext(FixtureParamsContext);

export function createFixtureParamsStore(): IFixtureParams {
  const [store, setStore] = createStore<IFixtureParamsStore>({
    params: {},
    state: {},
  });

  return {
    clear() {
      setStore({ params: {}, state: {} });
    },

    reset() {
      setStore(
        produce(s => {
          const newState: Record<number, boolean | string | number> = {};
          for (const key of Object.keys(s.params)) {
            newState[key] = defaultValue(s.params[key].type);
          }
          s.state = newState;
        })
      );
    },

    createParams<T extends { [key: string]: AnyParam }>(params: T): ParamAccessors<T> {
      setStore(
        produce(s => {
          const accessors = {} as Record<string, ParamAccessor<any>>;
          for (const key in params) {
            const p = params[key];
            s.state[key] = defaultValue(p);

            const fn = (value?: unknown) => {
              if (arguments.length == 0) {
                return store.state[key];
              } else {
                switch (p.type) {
                  case 'boolean':
                    if (typeof value !== 'boolean') {
                      throw new Error(
                        `Expected parameter "${key}" to be boolean, was ${typeof value}`
                      );
                    }
                    break;
                  case 'string':
                    if (typeof value !== 'string') {
                      throw new Error(
                        `Expected parameter "${key}" to be string, was ${typeof value}`
                      );
                    }
                    break;
                  case 'integer':
                  case 'float':
                    if (typeof value !== 'number') {
                      throw new Error(
                        `Expected parameter "${key}" to be number, was ${typeof value}`
                      );
                    }
                    break;
                }
                store.state[key] = value as string | number | boolean;
              }
            };
            fn.type = { ...p, caption: p.caption ?? key };
            accessors[key] = fn;
          }

          s.params = accessors;
        })
      );

      return store.params as ParamAccessors<T>;
    },

    keys() {
      return Object.keys(store.params);
    },

    list() {
      return Object.values(store.params);
    },

    getParam(key: string): ParamAccessor<any> {
      const p = store.params[key];
      if (!p) {
        throw new Error(`Undefined param: [${key}]`);
      }
      return p;
    },
  };
}

function defaultValue(param: AnyParam): boolean | string | number {
  if (param.default) {
    return param.default;
  }

  switch (param.type) {
    case 'boolean':
      return false;

    case 'string':
      if (param.enumVals?.length > 0) {
        return param.enumVals[0];
      }
      return '';

    case 'integer':
    case 'float':
      return param.minVal ?? 0;
  }
}

export function createFixtureParams<T extends { [key: string]: AnyParam }>(
  params: T
): ParamAccessors<T> {
  const store = useFixtureParamsContext();
  return store.createParams(params);
}
