import { describe, test, expect } from 'vitest';
import { convertKeyNameToKeyCode } from './keyNames';

describe('convertKeyNameToKeyCode', () => {
  test('digits', () => {
    expect(convertKeyNameToKeyCode('0')).toBe('Digit0');
    expect(convertKeyNameToKeyCode('1')).toBe('Digit1');
    expect(convertKeyNameToKeyCode('9')).toBe('Digit9');
  });

  test('letters', () => {
    expect(convertKeyNameToKeyCode('a')).toBe('KeyA');
    expect(convertKeyNameToKeyCode('A')).toBe('KeyA');
    expect(convertKeyNameToKeyCode('z')).toBe('KeyZ');
    expect(convertKeyNameToKeyCode('Z')).toBe('KeyZ');
  });

  test('punctuation', () => {
    expect(convertKeyNameToKeyCode('space')).toBe('Space');
    expect(convertKeyNameToKeyCode('esc')).toBe('Escape');
  });

  test('modifiers', () => {
    expect(convertKeyNameToKeyCode('left-shift')).toBe('ShiftLeft');
    expect(convertKeyNameToKeyCode('right-shift')).toBe('ShiftRight');
    expect(convertKeyNameToKeyCode('left-alt')).toBe('AltLeft');
    expect(convertKeyNameToKeyCode('right-alt')).toBe('AltRight');
  });
});
