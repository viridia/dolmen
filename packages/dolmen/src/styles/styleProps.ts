import { CSSProperties } from '@stitches/core';
import { Property } from '@stitches/core/types/css';
import { splitProps } from 'solid-js';
import { css } from './css';
import { Space, space } from './size';

const flexProps = {
  gap: (value: Space, css: CSSProperties) => {
    css.gap = space[value as Space];
  },

  alignItems: (value: Property.AlignItems, css: CSSProperties) => {
    css.alignItems = value;
  },

  justifyContent: (value: Property.JustifyContent, css: CSSProperties) => {
    css.justifyContent = value;
  },

  justifyItems: (value: Property.JustifyItems, css: CSSProperties) => {
    css.justifyItems = value;
  },

  flexDirection: (value: Property.FlexDirection, css: CSSProperties) => {
    css.flexDirection = value;
  },

  flexWrap: (value: Property.FlexWrap, css: CSSProperties) => {
    css.flexWrap = value;
  },
};

type CombinedPropBuilders = typeof flexProps;

type StyleArgument<T> = T extends (value: infer Arg, css: CSSProperties) => unknown ? Arg : never;
export type FlexProps = {
  [k in keyof typeof flexProps]?: StyleArgument<typeof flexProps[k]>;
};

type StylePropsResult<T> = [{ [key: string]: true }, Omit<T, keyof FlexProps>];
const allPropsKeys = Object.keys(flexProps) as (keyof CombinedPropBuilders)[];

/** Function that allows individual style properties to be passed as parameters
    to a component, inspired by styled-system.
 */
export function styleProps<T>(props: T & FlexProps): StylePropsResult<T> {
  const [styleProps, otherProps] = splitProps(props, allPropsKeys);

  let isEmpty = true;
  const translatedProps = {};
  for (const key in styleProps) {
    isEmpty = false;
    const converter = flexProps[key as keyof CombinedPropBuilders] as (
      value: unknown,
      props: CSSProperties
    ) => string;
    if (converter) {
      converter(styleProps[key as keyof CombinedPropBuilders], translatedProps);
    }
  }

  if (isEmpty) {
    return [{}, otherProps];
  }

  const style = css({ '&&': translatedProps }); // Use '&' to bump cascade priority
  return [{ [style.toString()]: true }, otherProps];
}
