import { describe, test, expect } from 'vitest';
import { convertKeyComboToPredicate, getBaseKeyCodes } from './combos';

describe('convertKeyComboToPredicate', () => {
  test('single keys', () => {
    expect(convertKeyComboToPredicate('a')({})).toBe(null);
    expect(convertKeyComboToPredicate('a')({ KeyA: true })).toBe('KeyA');
    expect(convertKeyComboToPredicate('A')({})).toBe(null);
    expect(convertKeyComboToPredicate('A')({ KeyA: true })).toBe('KeyA');
    expect(convertKeyComboToPredicate('z')({})).toBe(null);
    expect(convertKeyComboToPredicate('z')({ KeyZ: true })).toBe('KeyZ');
    expect(convertKeyComboToPredicate('Z')({})).toBe(null);
    expect(convertKeyComboToPredicate('Z')({ KeyZ: true })).toBe('KeyZ');

    expect(convertKeyComboToPredicate('1')({})).toBe(null);
    expect(convertKeyComboToPredicate('1')({ Digit1: true })).toBe('Digit1');

    expect(convertKeyComboToPredicate('[')({})).toBe(null);
    expect(convertKeyComboToPredicate('[')({ BracketLeft: true })).toBe('BracketLeft');

    expect(convertKeyComboToPredicate('left-shift')({})).toBe(null);
    expect(convertKeyComboToPredicate('left-shift')({ ShiftRight: true })).toBe(null);
    expect(convertKeyComboToPredicate('left-shift')({ ShiftLeft: true })).toBe('ShiftLeft');

    expect(convertKeyComboToPredicate('right-shift')({})).toBe(null);
    expect(convertKeyComboToPredicate('right-shift')({ ShiftLeft: true })).toBe(null);
    expect(convertKeyComboToPredicate('right-shift')({ ShiftRight: true })).toBe('ShiftRight');
  });

  test('groups', () => {
    expect(convertKeyComboToPredicate('shift')({})).toBe(null);
    expect(convertKeyComboToPredicate('shift')({ ShiftLeft: true })).toBe('ShiftLeft');
    expect(convertKeyComboToPredicate('shift')({ ShiftRight: true })).toBe('ShiftRight');
  });

  test('combinations', () => {
    expect(convertKeyComboToPredicate('shift+a')({})).toBe(null);
    expect(convertKeyComboToPredicate('shift+a')({ KeyA: true })).toBe(null);
    expect(convertKeyComboToPredicate('shift+a')({ ShiftLeft: true })).toBe(null);
    expect(convertKeyComboToPredicate('shift+a')({ KeyA: true, ShiftLeft: true })).toBe('KeyA');
    expect(convertKeyComboToPredicate('shift+a')({ KeyA: true, ShiftRight: true })).toBe('KeyA');

    expect(convertKeyComboToPredicate('shift+z')({})).toBe(null);

    expect(convertKeyComboToPredicate('ctrl+1')({})).toBe(null);
    expect(convertKeyComboToPredicate('ctrl+1')({ Digit1: true })).toBe(null);
    expect(convertKeyComboToPredicate('ctrl+1')({ ControlLeft: true })).toBe(null);
    expect(convertKeyComboToPredicate('ctrl+1')({ Digit1: true, ControlLeft: true })).toBe(
      'Digit1'
    );

    expect(convertKeyComboToPredicate('alt+[')({})).toBe(null);
    expect(convertKeyComboToPredicate('alt+[')({ AltLeft: true, BracketLeft: true })).toBe(
      'BracketLeft'
    );

    expect(convertKeyComboToPredicate('left-shift+s')({})).toBe(null);
    expect(convertKeyComboToPredicate('left-shift+s')({ ShiftRight: true })).toBe(null);
    expect(convertKeyComboToPredicate('left-shift+s')({ ShiftLeft: true, KeyS: true })).toBe(
      'KeyS'
    );
  });
});

describe('getBaseKeyCodes', () => {
  test('single keys', () => {
    expect(getBaseKeyCodes('a')).toEqual(['KeyA']);
    expect(getBaseKeyCodes('A')).toEqual(['KeyA']);
    expect(getBaseKeyCodes('z')).toEqual(['KeyZ']);
    expect(getBaseKeyCodes('Z')).toEqual(['KeyZ']);
    expect(getBaseKeyCodes('1')).toEqual(['Digit1']);
    expect(getBaseKeyCodes('[')).toEqual(['BracketLeft']);
    expect(getBaseKeyCodes('left-shift')).toEqual(['ShiftLeft']);
  });

  test('groups', () => {
    expect(getBaseKeyCodes('shift')).toEqual(['ShiftLeft', 'ShiftRight']);
  });

  test('combinations', () => {
    expect(getBaseKeyCodes('shift+a')).toEqual(['KeyA']);
    expect(getBaseKeyCodes('ctrl+1')).toEqual(['Digit1']);
  });

  test('multiples', () => {
    expect(getBaseKeyCodes(['shift+a', 'ctrl+1'])).toEqual(['KeyA', 'Digit1']);
  });
});
