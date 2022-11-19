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

export const flexMap: Record<keyof FlexProps, string> = {
  gap: 'gap',
  alignItems: 'ai',
  justifyContent: 'jc',
  justifyItems: 'ji',
  flexDirection: 'fd',
  flexWrap: 'fw',
};

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
      result[`dm-${flexMap[key]}-${props[key]}`] = true;
    }
  }

  return result;
}
