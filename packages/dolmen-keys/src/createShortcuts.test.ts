import { describe, test, expect } from 'vitest';
import { createShortcutMap } from './createShortcuts';

const cb = () => {
  //
};

describe('convertKeyNameToKeyCode', () => {
  test('digits', () => {
    expect(createShortcutMap({ '0': cb })).toStrictEqual({
      '0': [{ callback: cb, modifiers: '' }],
    });
    expect(createShortcutMap({ '1': cb })).toStrictEqual({
      '1': [{ callback: cb, modifiers: '' }],
    });
    expect(createShortcutMap({ '0': cb, '9': cb })).toStrictEqual({
      '0': [{ callback: cb, modifiers: '' }],
      '9': [{ callback: cb, modifiers: '' }],
    });
  });

  test('letters', () => {
    expect(createShortcutMap({ a: cb, Z: cb })).toStrictEqual({
      a: [{ callback: cb, modifiers: '' }],
      z: [{ callback: cb, modifiers: '' }],
    });
  });

  test('punctuation', () => {
    expect(createShortcutMap({ space: cb, esc: cb })).toStrictEqual({
      Space: [{ callback: cb, modifiers: '' }],
      Escape: [{ callback: cb, modifiers: '' }],
    });
  });

  test('modifiers', () => {
    expect(createShortcutMap({ 'shift+a': cb, 'ctrl+a': cb, 'alt+ctrl+z': cb })).toStrictEqual({
      a: [
        { callback: cb, modifiers: 'shift' },
        { callback: cb, modifiers: 'ctrl' },
      ],
      z: [{ callback: cb, modifiers: 'alt+ctrl' }],
    });
  });
});
