/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createContext, useContext } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { KeyCode, KeyCodes } from './KeyCodes';

type Callback = (e: KeyboardEvent) => void;
type KeyCodeListener = (keys: KeyCodes, code?: KeyCode) => void;

export interface KeyStackEntry {
  shortcuts?: Record<string, ShortcutEntry[]>;
  listener?: KeyCodeListener;
  modal?: boolean;
}

export interface ShortcutEntry {
  modifiers: string;
  callback: Callback;
}

export interface ShortcutMap {
  [keyname: string]: ShortcutEntry[];
}

export class KeysManager {
  private stack: KeyStackEntry[] = [];
  private heldKeys: Store<KeyCodes>;
  private setHeldKeys: SetStoreFunction<KeyCodes>;
  private watchers: KeyCodeListener[] = [];

  constructor() {
    [this.heldKeys, this.setHeldKeys] = createStore<KeyCodes>({});
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.watch = this.watch.bind(this);
    /** @ts-ignore */
    if (globalThis.addEventListener) {
      globalThis.addEventListener('keydown', this.onKeyDown);
      globalThis.addEventListener('keyup', this.onKeyUp);
      globalThis.addEventListener('blur', this.onBlur);
    }
  }

  public dispose() {
    /** @ts-ignore */
    if (globalThis.addEventListener) {
      globalThis.removeEventListener('keydown', this.onKeyDown);
      globalThis.removeEventListener('keyup', this.onKeyUp);
      globalThis.removeEventListener('blur', this.onBlur);
    }
    this.watchers = [];
  }

  public get activeKeys(): Readonly<KeyCodes> {
    return this.heldKeys;
  }

  public push(entry: KeyStackEntry): () => void {
    this.stack.push(entry);
    return () => {
      const index = this.stack.indexOf(entry);
      if (index >= 0) {
        this.stack.splice(index, 1);
      }
    };
  }

  public watch(watcher: KeyCodeListener): () => void {
    this.watchers.push(watcher);
    return () => {
      const index = this.watchers.indexOf(watcher);
      if (index >= 0) {
        this.watchers.splice(index, 1);
      }
    };
  }

  private onKeyDown(e: KeyboardEvent) {
    // Don't react to key events if focus is on an input field
    if (
      document.activeElement?.tagName === 'INPUT' ||
      document.activeElement?.tagName === 'TEXTAREA'
    ) {
      return;
    }
    const code = e.code as KeyCode;
    this.setHeldKeys(code, true);

    const modifiers = eventModifiers(e);
    for (let i = this.stack.length - 1; i >= 0; i -= 1) {
      const entry = this.stack[i];
      // TODO: un-shift @#$% etc.

      if (entry.listener) {
        entry.listener(this.heldKeys, code);
      }

      const scList = entry.shortcuts?.[e.key];
      if (scList) {
        const sc = scList.find(s => s.modifiers === modifiers);
        if (sc) {
          e.preventDefault();
          e.stopPropagation();
          sc.callback(e);
          return;
        }
      }

      if (entry.modal) {
        return;
      }
    }

    // this.notifyWatchers(code);
  }

  // Remove from the set of held keys.
  private onKeyUp(e: KeyboardEvent) {
    const code = e.code as KeyCode;
    this.setHeldKeys(code, false);
    for (let i = this.stack.length - 1; i >= 0; i -= 1) {
      const entry = this.stack[i];
      // TODO: un-shift @#$% etc.

      if (entry.listener) {
        entry.listener(this.heldKeys, code);
      }

      if (entry.modal) {
        return;
      }
    }
  }

  // Release all held keys if window loses focus.
  private onBlur() {
    this.setHeldKeys({});
    this.notifyWatchers();
  }

  private notifyWatchers(code?: KeyCode) {
    this.watchers.forEach(l => l(this.heldKeys, code));
  }
}

function eventModifiers(e: KeyboardEvent): string {
  const modifiers = [];
  if (e.shiftKey) {
    modifiers.push('shift');
  }
  if (e.altKey) {
    modifiers.push('alt');
  }
  if (e.ctrlKey) {
    modifiers.push('ctrl');
  }
  if (e.metaKey) {
    modifiers.push('meta');
  }
  return modifiers.sort().join('+');
}

export const KeysManagerContext = createContext<KeysManager>({} as KeysManager);

export const useKeysManager = () => {
  return useContext(KeysManagerContext);
};
