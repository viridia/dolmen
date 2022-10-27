import { CSSProperties } from '@stitches/core';
import { Property } from '@stitches/core/types/css';
import { splitProps } from 'solid-js';
import { css } from './css';
import { Space, space } from './size';
import { Z, ZIndices } from './z';

const spaceAlias = (s: string | number) => (typeof s === 'string' && space[s as Space] || s);

const zAlias = (z: string | number) => {
  const result = Z[z as ZIndices];
  if (result !== undefined) {
    return result;
  } else if (typeof z === 'number') {
    return z;
  } else {
    console.warn(`Invalid zIndex value: ${JSON.stringify(z)}`);
    return undefined;
  }
};

/** Translates shortcuts such as "xl" into a form acceptable to Stitches. */
const conversionMap = {
  gap: (value: Property.Gap | Space, css: CSSProperties) => {
    css.gap = spaceAlias(value);
  },

  rowGap: (value: Property.RowGap | Space, css: CSSProperties) => {
    css.rowGap = spaceAlias(value);
  },

  columnGap: (value: Property.ColumnGap | Space, css: CSSProperties) => {
    css.columnGap = spaceAlias(value);
  },

  m: (value: Property.Margin | Space, css: CSSProperties) => {
    css.margin = spaceAlias(value);
  },

  margin: (value: Property.Margin | Space, css: CSSProperties) => {
    css.margin = spaceAlias(value);
  },

  ml: (value: Property.Margin | Space, css: CSSProperties) => {
    css.marginLeft = spaceAlias(value);
  },

  mr: (value: Property.Margin | Space, css: CSSProperties) => {
    css.marginRight = spaceAlias(value);
  },

  mt: (value: Property.Margin | Space, css: CSSProperties) => {
    css.marginTop = spaceAlias(value);
  },

  mb: (value: Property.Margin | Space, css: CSSProperties) => {
    css.marginBottom = spaceAlias(value);
  },

  mx: (value: Property.Margin | Space, css: CSSProperties) => {
    css.marginLeft = css.marginRight = spaceAlias(value);
  },

  my: (value: Property.Margin | Space, css: CSSProperties) => {
    css.marginTop = css.marginBottom = spaceAlias(value);
  },

  p: (value: Property.Margin | Space, css: CSSProperties) => {
    css.padding = spaceAlias(value);
  },

  pl: (value: Property.Margin | Space, css: CSSProperties) => {
    css.paddingLeft = spaceAlias(value);
  },

  pr: (value: Property.Margin | Space, css: CSSProperties) => {
    css.paddingRight = spaceAlias(value);
  },

  pt: (value: Property.Margin | Space, css: CSSProperties) => {
    css.paddingTop = spaceAlias(value);
  },

  pb: (value: Property.Margin | Space, css: CSSProperties) => {
    css.paddingBottom = spaceAlias(value);
  },

  px: (value: Property.Margin | Space, css: CSSProperties) => {
    css.paddingLeft = css.paddingRight = spaceAlias(value);
  },

  py: (value: Property.Margin | Space, css: CSSProperties) => {
    css.paddingTop = css.paddingBottom = spaceAlias(value);
  },

  zIndex: (value: Property.ZIndex | ZIndices, css: CSSProperties) => {
    css.zIndex = zAlias(value);
  },

  w: (value: Property.Width, css: CSSProperties) => {
    css.width = value;
  },

  h: (value: Property.Height, css: CSSProperties) => {
    css.height = value;
  },

  maxWidth: (value: Property.MaxWidth, css: CSSProperties) => {
    css.maxWidth = value;
  },

  minWidth: (value: Property.MaxHeight, css: CSSProperties) => {
    css.minWidth = value;
  },

  maxHeight: (value: Property.MinWidth, css: CSSProperties) => {
    css.maxWidth = value;
  },

  minHeight: (value: Property.MinHeight, css: CSSProperties) => {
    css.minWidth = value;
  },

  alignItems: (value: Property.AlignItems, css: CSSProperties) => {
    css.alignItems = value;
  },

  alignSelf: (value: Property.AlignSelf, css: CSSProperties) => {
    css.alignSelf = value;
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

  flexGrow: (value: Property.FlexGrow, css: CSSProperties) => {
    css.flexGrow = value;
  },

  flexShrink: (value: Property.FlexShrink, css: CSSProperties) => {
    css.flexShrink = value;
  },

  flexBasis: (value: Property.FlexBasis, css: CSSProperties) => {
    css.flexBasis = value;
  },

  flexWrap: (value: Property.FlexWrap, css: CSSProperties) => {
    css.flexWrap = value;
  },

  flex: (value: Property.Flex, css: CSSProperties) => {
    css.flex = value;
  },
};

type StylePropsMap = typeof conversionMap;
type StyleKey = keyof StylePropsMap;

type StyleArgument<T> = T extends (value: infer Arg, css: CSSProperties) => unknown ? Arg : never;
export type StyleProps = { [k in StyleKey]?: StyleArgument<StylePropsMap[k]> };
type StylePropsResult<T> = [{ [key: string]: true }, Omit<T, keyof StyleProps>];

const stylePropsKeys = Object.keys(conversionMap) as StyleKey[];

/** Function that allows individual style properties to be passed as parameters
    to a component, inspired by styled-system.
 */
export function styleProps<T>(props: T & StyleProps): StylePropsResult<T> {
  const [styleProps, otherProps] = splitProps(props, stylePropsKeys);

  let isEmpty = true;
  const translatedProps = {};
  for (const key in styleProps) {
    isEmpty = false;
    const converter = conversionMap[key as StyleKey] as (
      value: unknown,
      props: CSSProperties
    ) => string;
    if (converter) {
      converter(styleProps[key as StyleKey], translatedProps);
    }
  }

  if (isEmpty) {
    return [{}, otherProps];
  }

  const style = css({ '&&': translatedProps }); // Use '&' to bump cascade priority
  return [{ [style.toString()]: true }, otherProps];
}
