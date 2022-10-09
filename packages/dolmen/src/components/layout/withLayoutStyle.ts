import { splitProps } from 'solid-js';
import { layoutStyle, LayoutStyleProps } from './layout.css';

type LayoutStylePropsResult<T extends {}> = [
  { [key: string]: boolean },
  Omit<T, keyof LayoutStyleProps>
];

/** Utility function to split out the props that are used by the layout recipe. */
export function withLayoutStyle<T extends {}>(
  props: T & LayoutStyleProps
): LayoutStylePropsResult<T> {
  const [lprops, rest] = splitProps(props, [
    'gap',
    'margin',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'marginX',
    'marginY',
    'ml',
    'mr',
    'mt',
    'mb',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'paddingX',
    'paddingY',
    'pl',
    'pr',
    'pt',
    'pb',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'flexDirection',
  ]);

  return [
    {
      [layoutStyle(lprops)]: Object.keys(lprops).length > 0,
    },
    rest,
  ];
}
