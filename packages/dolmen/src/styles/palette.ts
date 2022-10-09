import { mix } from '../lib';

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
  for (let i = 50; i < 1000; i += 50) {
    let theta = Math.pow(i / 1000, 1.2); // Gamma correction so that colors look evenly spaced
    if (theta < 0.5) {
      // Mix with white
      result[i] = mix(base, '#ffffff', 1 - theta * 2);
    } else {
      // Mix with black
      result[i] = mix(base, '#000000', theta * 2 - 1);
    }
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

// $primary: #5358ed;
// $secondary: $g50;
// $danger: rgb(153, 44, 169);
// $textHighlight: #5358ed;
// $focus: #b7b9e9;

// $primaryDark: #383dbe;
// $secondaryDark: $cg60;
// $dangerDark: rgb(90, 25, 100);
// $focusDark: $cg70;

// html:not(.dark) {
//   --page-bg: #{$g5};
//   --focus-color: #{$focus};

//   --navbar-bg: #{$g0};
//   --navbar-shadow: #{darken($g0, 30%)};

//   --scrollbar-thumb: rgba(0, 0, 0, 0.2);
//   --scrollbar-thumb-inactive: rgba(0, 0, 0, 0.1);

//   --input-bg: #{$g5};
//   --input-text: #{$g80};
//   --input-border: #{$g10};
//   --input-hover-border: #{$g15};
//   --input-selection-bg: #{$textHighlight};
//   --input-selection-text: black;
//   --input-icon-color: #{$g30};

//   --drawer-bg: #{$g0};
//   --drawer-shadow: #{$g40};
//   --drawer-drag-bg: #{$g10};
// }

// html.dark {
//   --page-bg: #{$cg90};
//   --focus-color: #{$focusDark};

//   --navbar-bg: #{$cg80};
//   --navbar-shadow: #000;

//   --scrollbar-thumb: rgba(0, 0, 0, 0.2);
//   --scrollbar-thumb-inactive: rgba(0, 0, 0, 0.1);

//   --input-bg: #{$cg90};
//   --input-text: #{$cg20};
//   --input-border: #000;
//   --input-hover-border: #{$cg70};
//   --input-selection-bg: #{$textHighlight};
//   --input-selection-text: white;
//   --input-icon-color: #{$cg60};

//   --drawer-bg: #{$cg80};
//   --drawer-shadow: #000;
//   --drawer-drag-bg: #{$g30};
// }
