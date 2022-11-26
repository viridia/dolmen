import { KeyCode } from './KeyCodes';

const specialKeyNames: { [key: string]: KeyCode } = {
  space: 'Space',
  esc: 'Escape',
  enter: 'Enter',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  del: 'Delete',
  delete: 'Delete',
  backspace: 'Backspace',
};

const keyCodeNames: { [key: string]: KeyCode } = {
  ...specialKeyNames,
  'left-shift': 'ShiftLeft',
  'right-shift': 'ShiftRight',
  'left-ctrl': 'ControlLeft',
  'right-ctrl': 'ControlRight',
  'left-alt': 'AltLeft',
  'right-alt': 'AltRight',
  'left-meta': 'MetaLeft',
  'right-meta': 'MetaRight',
  '[': 'BracketLeft',
  ']': 'BracketRight',
  '/': 'Slash',
  '\\': 'Backslash',
  ',': 'Comma',
  '.': 'Period',
  '-': 'Minus',
  '=': 'Equal',
};

export function convertKeyNameToKeyCode(keyName: string): KeyCode | undefined {
  if (/^\d$/.test(keyName)) {
    return `Digit${keyName}` as KeyCode;
  } else if (/^[a-zA-Z]$/.test(keyName)) {
    return `Key${keyName.toUpperCase()}` as KeyCode;
  } else {
    return keyCodeNames[keyName] ?? keyName;
  }
}

// export function convertSpecialKeyNameToKeyCode(keyName: string): KeyCode | undefined {
//   return specialKeyNames[keyName] || convertKeyNameToKeyCode(keyName);
// }
