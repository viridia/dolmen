import { describe, test, expect } from 'vitest';
import { createShortcutMap } from './createShortcuts';

const cb = () => {
  //
};

describe('convertKeyNameToKeyCode', () => {
  test('digits', () => {
    expect(createShortcutMap({ '0': cb })).toStrictEqual({
      Digit0: [{ callback: cb, modifiers: '' }],
    });
    expect(createShortcutMap({ '1': cb })).toStrictEqual({
      Digit1: [{ callback: cb, modifiers: '' }],
    });
    expect(createShortcutMap({ '0': cb, '9': cb })).toStrictEqual({
      Digit0: [{ callback: cb, modifiers: '' }],
      Digit9: [{ callback: cb, modifiers: '' }],
    });
  });

  test('letters', () => {
    expect(createShortcutMap({ a: cb, Z: cb })).toStrictEqual({
      KeyA: [{ callback: cb, modifiers: '' }],
      KeyZ: [{ callback: cb, modifiers: '' }],
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
      KeyA: [
        { callback: cb, modifiers: 'shift' },
        { callback: cb, modifiers: 'ctrl' },
      ],
      KeyZ: [{ callback: cb, modifiers: 'alt+ctrl' }],
    });
  });
});
