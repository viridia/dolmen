import { convertKeyNameToKeyCode } from './keyNames';
import { KeyCode, KeyCodes } from './KeyCodes';

/** Returns either the key that matched, or null. */
export type KeyComboPredicate = (keys: KeyCodes) => KeyCode | null;

/** Recognizes a key down event. */
export type KeyComboFilter = (e: KeyboardEvent) => boolean;

const keyGroups: { [key: string]: KeyCode[] } = {
  shift: ['ShiftLeft', 'ShiftRight'],
  ctrl: ['ControlLeft', 'ControlRight'],
  alt: ['AltLeft', 'AltRight'],
  meta: ['MetaLeft', 'MetaRight'],
  mod: ['AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'],
  'mod-left': ['AltLeft', 'MetaLeft'],
  'mod-right': ['AltRight', 'MetaRight'],
};

export function convertKeyComboToPredicate(combos: string | string[]): KeyComboPredicate {
  function generateCombos(combo: string): KeyComboPredicate {
    const keyNames = combo.trim().split(/\+/);
    if (keyNames.length === 0) {
      return () => null;
    }

    const terms: KeyComboPredicate[] = keyNames.map(key => {
      const group = keyGroups[key];
      if (group) {
        return (keys: KeyCodes) => {
          for (const gk of group) {
            const key = keys[gk];
            if (key) {
              return gk;
            }
          }
          return null;
        };
      } else {
        const code = convertKeyNameToKeyCode(key);
        if (!code) {
          console.error(key);
          throw new Error(`Invalid key code: ${key}`);
        }
        return (keys: KeyCodes) => (keys[code] ? code : null);
      }
    });

    if (terms.length === 1) {
      return terms[0];
    } else {
      return (keys: KeyCodes) => {
        let lastKey: KeyCode | null = null;
        for (const term of terms) {
          lastKey = term(keys);
          if (!lastKey) {
            break;
          }
        }
        return lastKey;
      };
    }
  }

  if (typeof combos === 'string') {
    return generateCombos(combos);
  } else if (Array.isArray(combos)) {
    const predicates = combos.map(combo => generateCombos(combo));
    if (predicates.length === 1) {
      return predicates[0];
    }
    return (keys: KeyCodes) => {
      for (const pred of predicates) {
        const key = pred(keys);
        if (key) {
          return key;
        }
      }
      return null;
    };
  } else {
    throw new TypeError(`Invalid combo: ${combos}`);
  }
}

export function getBaseKeyCodes(combos: string | string[]): string[] {
  function parseCombo(combo: string): string[] {
    const keyNames = combo.trim().split(/\+/);
    if (keyNames.length === 0) {
      return [];
    }

    const key = keyNames.at(-1);
    if (!key) {
      return [];
    }

    const code = convertKeyNameToKeyCode(key);
    if (!code) {
      const group = keyGroups[key];
      if (group) {
        return group;
      }

      console.error(key);
      throw new Error(`Invalid key code: ${key}`);
    }
    return [code];
  }

  return (typeof combos === 'string' ? [combos] : combos)
    .map(combo => parseCombo(combo))
    .flat()
    .filter(key => Boolean(key));
}
