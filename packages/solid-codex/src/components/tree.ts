import { Component, createContext } from 'solid-js';
import { createStore } from 'solid-js/store';
// import { createLocalStorageStore } from '../data/createLocalStorageStore';
import type { IFixture } from '../data/fixtures';

export interface IFixtureTreeNode {
  title: string;
  fixture?: IFixture;
  children?: IFixtureTreeNode[];
  component?: Component;
  category: string[];
}

export interface IFixtureTree {
  children?: IFixtureTreeNode[];
  byId: Record<string, IFixtureTreeNode>;
}

export interface ITreeExpansionState {
  isExpanded(key: string): boolean | undefined;
  setExpanded(key: string, expanded: boolean): void
}

export function createExpansionStateStore(storageKey: string): ITreeExpansionState {
  // const [store, setStore] = createLocalStorageStore<Record<string, boolean>>(storageKey, {});
  const [store, setStore] = createStore<Record<string, boolean>>({});

  return {
    isExpanded(key: string): boolean | undefined {
      return store[key];
    },

    setExpanded(key: string, expanded: boolean) {
      return setStore(key, expanded);
    },
  };
}

export const TreeExpansionContext = createContext<ITreeExpansionState>();
