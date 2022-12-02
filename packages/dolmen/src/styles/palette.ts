import { colord } from 'colord';

type ColorKey =
  | 50
  | 100
  | 150
  | 200
  | 250
  | 300
  | 400
  | 500
  | 600
  | 700
  | 750
  | 800
  | 850
  | 900
  | 950;

export const colorKeys: ColorKey[] = [
  50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950,
];

// type NamedColor<Base extends string> = `${Base}${ColorKey}`;

// type ColorRange<Base extends string> = {
//   [key in NamedColor<Base>]: string;
// };

export function createKeyedColor(base: string, key: ColorKey): string {
  const hsl = colord(base).toHsl();
  return colord({
    h: hsl.h,
    l: 100 - (key * 100) / 1000,
    s: hsl.s,
  }).toHex();
}

// export function createColorRange<Base extends string>(name: Base, base: string): ColorRange<Base> {
//   const result = {} as ColorRange<Base>;
//   for (const i of colorKeys) {
//     const key: NamedColor<Base> = `${name}${i}`;
//     result[key] = createKeyedColor(base, i);
//   }
//   return result;
// }

// /** A sequence of colors of a given hue, ranging from light to dark. */
// export const palette = {
//   white: '#ffffff',
//   black: '#000000',
//   ...createColorRange('gray', '#8C8C8C'),
//   ...createColorRange('coolgray', '#7F96AD'),
//   ...createColorRange('warmgray', '#9F988F'),
// };
