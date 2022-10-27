import { createContext, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

export interface IParamBoolean {
  type: 'boolean';
  caption?: string;
  default?: boolean;
}

export interface IParamString {
  type: 'string';
  caption?: string;
  default?: string;
  enumVals?: string[];
}

export interface IParamInteger {
  type: 'integer';
  caption?: string;
  default?: number;
  minVal?: number;
  maxVal?: number;
}

export interface IParamFloat {
  type: 'float';
  caption?: string;
  default?: number;
  minVal?: number;
  maxVal?: number;
  precision?: number;
}

export type AnyParam = IParamBoolean | IParamString | IParamInteger | IParamFloat;
type ParamType<T extends AnyParam> = T extends IParamBoolean
  ? boolean
  : T extends IParamString
  ? string
  : T extends IParamInteger | IParamFloat
  ? number
  : never;

type ParamGetter<T> = () => T;
type ParamSetter<T> = (value: T) => void;
export type ParamAccessor<T> = ParamGetter<T> & ParamSetter<T> & { descriptor: AnyParam };

export type ParamAccessors<T extends { [key: string]: AnyParam }> = {
  [key in keyof T]: ParamAccessor<ParamType<T[key]>>;
};

/** Context for defining fixture parameters. */
export interface ICodex {
  /** Remove all parameter definitions from the store. */
  clearParams(): void;

  /** Reset all parameters to their default values. */
  resetParams(): void;

  /** Add a new parameter, and return an accessor of the value of that parameter. */
  createParams<T extends { [key: string]: AnyParam }>(params: T): ParamAccessors<T>;

  /** Return the keys of all defined parameters. */
  // keys(): ReadonlyArray<string>;

  /** Return the list of all parameter accessors. */
  listParams(): ReadonlyArray<ParamAccessor<unknown>>;

  /** Get the accessors for the given parameter. */
  getParam(key: string): ParamAccessor<unknown>;

  /** Append a message to the event log. */
  log(message: string): void;

  /** Creates a callback that prints to the log when invoked. */
  action(message: string): () => void;

  /** Return current log entries. */
  logs(): string[];

  /** Clear saved log entries. */
  clearLogs(): void;
}

interface ICodexStore {
  params: Record<string, ParamAccessor<unknown>>;
  state: Record<string, boolean | string | number>;
  logEntries: string[];
}

export const CodexContext = createContext<ICodex>();

export const useCodex = () => {
  const context = useContext(CodexContext);
  if (!context) {
    throw new Error('Missing Fixture Params Context');
  }
  return context;
};

export function createCodex(): ICodex {
  const [store, setStore] = createStore<ICodexStore>({
    params: {},
    state: {},
    logEntries: [],
  });

  return {
    clearParams() {
      setStore({ params: {}, state: {} });
    },

    resetParams() {
      setStore(
        produce(s => {
          const newState: Record<string, boolean | string | number> = {};
          for (const key of Object.keys(s.params)) {
            newState[key] = defaultValue(s.params[key].descriptor);
          }
          s.state = newState;
        })
      );
    },

    createParams<T extends { [key: string]: AnyParam }>(params: T): ParamAccessors<T> {
      setStore(
        produce(s => {
          const accessors = {} as Record<string, ParamAccessor<unknown>>;
          for (const key in params) {
            const p = params[key];
            s.state[key] = defaultValue(p);

            // eslint-disable-next-line no-inner-declarations
            function access(value?: unknown) {
              // console.log(arguments);
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
                setStore('state', key, value);
              }
            }

            access.descriptor = { ...p, caption: p.caption ?? key };
            accessors[key] = access;
          }

          s.params = accessors;
        })
      );

      return store.params as ParamAccessors<T>;
    },

    // keys() {
    //   return Object.keys(store.params);
    // },

    listParams() {
      return Object.values(store.params);
    },

    getParam(key: string): ParamAccessor<unknown> {
      const p = store.params[key];
      if (!p) {
        throw new Error(`Undefined param: [${key}]`);
      }
      return p;
    },

    log(message: string) {
      setStore('logEntries', [...store.logEntries, message]);
    },

    logs(): string[] {
      return store.logEntries;
    },

    clearLogs(): void {
      setStore('logEntries', []);
    },

    action(message: string): () => void {
      return () => {
        setStore('logEntries', [...store.logEntries, message]);
      };
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
      if (param.enumVals && param.enumVals.length > 0) {
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
  const store = useCodex();
  return store.createParams(params);
}
