import { KeysManagerContext } from './KeysManager';
import { convertKeyComboToPredicate, getBaseKeyCodes } from './combos';
import { useContext } from 'solid-js';

export function createActiveKeys<T extends Record<string, string>, K extends keyof T>(
  keyMap: Record<K, string | string[]>
): Record<K, boolean> {
  const mgr = useContext(KeysManagerContext);
  const state = {} as Record<K, boolean>;
  const exclusionMap = new Map<string, string[]>();

  for (const signal in keyMap) {
    const predicates = convertKeyComboToPredicate(keyMap[signal]);
    const baseKeys = getBaseKeyCodes(keyMap[signal]);
    const exclusions = new Set<string>();
    for (const key of baseKeys) {
      const exList = exclusionMap.get(key) ?? [];
      exList.forEach(k => exclusions.add(k));
    }
    const exclusionsArray = Array.from(exclusions);
    Object.defineProperty(state, signal, {
      get: () => {
        if (predicates(mgr.activeKeys)) {
          if (exclusionsArray.some(otherSignal => state[otherSignal as K])) {
            return false;
          }
          return true;
        }
        return false;
      },
      enumerable: true,
    });
    for (const key of baseKeys) {
      const exList = exclusionMap.get(key);
      if (exList) {
        exList.push(signal);
      } else {
        exclusionMap.set(key, [signal]);
      }
    }
  }

  return state;
}
