import { mix } from '../lib';
import { colord } from 'colord';

/** A sequence of colors of a given hue, ranging from light to dark. */
export interface ColorSpread {
  50: string;
  100: string;
  150: string;
  200: string;
  250: string;
  300: string;
  350: string;
  400: string;
  450: string;
  500: string;
  550: string;
  600: string;
  650: string;
  700: string;
  750: string;
  800: string;
  850: string;
  900: string;
  950: string;
}

/** Algorithmically generate a spread of colors from light to dark, with a specified
    base color in the middle.
 */
export function createColorSpread(base: string): ColorSpread {
  const result: ColorSpread = {} as ColorSpread;
  const hsl = colord(base).toHsl();
  for (let i = 50; i < 1000; i += 50) {
    result[i] = colord({ h: hsl.h, l: 100 - i * 100 / 1000, s: hsl.s }).toHex();
  }
  return result;
}

export const palette = {
  white: '#ffffff',
  black: '$000000',
  gray: createColorSpread('#8C8C8C'),
  coolgray: createColorSpread('#7F96AD'),
  warmgray: createColorSpread('#9F988F'),
};
