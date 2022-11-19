import { SizeVariant } from './size';

export interface FlexProps {
  gap?: SizeVariant;
  alignItems?: 'start' | 'end' | 'flex-start' | 'flex-end' | 'stretch' | 'center';
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  justifyItems?:
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'stretch'
    | 'center'
    | 'baseline';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'wrap' | 'wrapReverse' | 'nowrap';
}

export const flexKeys: (keyof FlexProps)[] = [
  'gap',
  'alignItems',
  'justifyContent',
  'justifyItems',
  'flexDirection',
  'flexWrap',
];

const EMPTY: Record<string, boolean> = {};
export function flexProps<T extends FlexProps>(props: T): Record<string, boolean> {
  let result: Record<string, boolean> | undefined = EMPTY;
  for (const key of flexKeys) {
    if (key in props) {
      if (result === EMPTY) {
        result = {};
      }
      result[`dm-${key}-${props[key]}`] = true;
    }
  }

  return result;
}

// /** Utility styles for flexbox components. */
// export const flexPropsCss = css({
//   variants: {
//     gap: {
//       xs: { gap: space.xs },
//       sm: { gap: space.sm },
//       md: { gap: space.md },
//       lg: { gap: space.lg },
//       xl: { gap: space.xl },
//     },

//     alignItems: {
//       start: { alignItems: 'start' },
//       end: { alignItems: 'end' },
//       'flex-start': { alignItems: 'flex-start' },
//       'flex-end': { alignItems: 'flex-end' },
//       stretch: { alignItems: 'stretch' },
//       center: { alignItems: 'center' },
//     },

//     justifyContent: {
//       start: { justifyContent: 'start' },
//       end: { justifyContent: 'end' },
//       center: { justifyContent: 'center' },
//       'flex-start': { justifyContent: 'flex-start' },
//       'flex-end': { justifyContent: 'flex-end' },
//       'space-around': { justifyContent: 'space-around' },
//       'space-between': { justifyContent: 'space-between' },
//       'space-evenly': { justifyContent: 'space-evenly' },
//     },

//     justifyItems: {
//       start: { justifyItems: 'start' },
//       end: { justifyItems: 'end' },
//       'flex-start': { justifyItems: 'flex-start' },
//       'flex-end': { justifyItems: 'flex-end' },
//       left: { justifyItems: 'left' },
//       right: { justifyItems: 'right' },
//       stretch: { justifyItems: 'stretch' },
//       center: { justifyItems: 'center' },
//       baseline: { justifyItems: 'baseline' },
//     },

//     flexDirection: {
//       row: { flexDirection: 'row' },
//       'row-reverse': { flexDirection: 'row-reverse' },
//       column: { flexDirection: 'column' },
//       'column-reverse': { flexDirection: 'column-reverse' },
//     },

//     flexWrap: {
//       wrap: { flexWrap: 'wrap' },
//       wrapReverse: { flexWrap: 'wrap-reverse' },
//       nowrap: { flexWrap: 'nowrap' },
//     },
//   },
// });
