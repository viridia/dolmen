import { CSSProperties } from '@stitches/core';
import { Property } from '@stitches/core/types/css';
import { splitProps } from 'solid-js';
import { css, config } from './css';
import { Spacings, ZIndices } from './cssTypes';

const space = config.theme.space;
const zIndices = config.theme.zIndices;

const spaceAlias = (s: string | number) => (typeof s === 'string' && s in space ? `$${s}` : s);
const zAlias = (z: string | number) => (typeof z === 'string' && z in zIndices ? `$${z}` : z);

/** Translates shortcuts such as "xl" into a form acceptable to Stitches. */
const conversionMap = {
  gap: (value: Property.Gap | Spacings, css: CSSProperties) => {
    css.gap = spaceAlias(value);
  },

  m: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.margin = spaceAlias(value);
  },

  margin: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.margin = spaceAlias(value);
  },

  ml: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.marginLeft = spaceAlias(value);
  },

  mr: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.marginRight = spaceAlias(value);
  },

  mt: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.marginTop = spaceAlias(value);
  },

  mb: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.marginBottom = spaceAlias(value);
  },

  mx: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.marginLeft = css.marginRight = spaceAlias(value);
  },

  my: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.marginTop = css.marginBottom = spaceAlias(value);
  },

  p: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.padding = spaceAlias(value);
  },

  pl: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.paddingLeft = spaceAlias(value);
  },

  pr: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.paddingRight = spaceAlias(value);
  },

  pt: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.paddingTop = spaceAlias(value);
  },

  pb: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.paddingBottom = spaceAlias(value);
  },

  px: (value: Property.Margin | Spacings, css: CSSProperties) => {
    css.paddingLeft = css.paddingRight = spaceAlias(value);
  },

  py: (value: Property.Margin | Spacings, css: CSSProperties) => {
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
type StylePropsResult<T extends {}> = [{ [key: string]: true }, Omit<T, keyof StyleProps>];

const stylePropsKeys = Object.keys(conversionMap) as StyleKey[];

/** Function that allows individual style properties to be passed as parameters
    to a component, inspired by styled-system.
 */
export function styleProps<T extends {}>(props: T & StyleProps): StylePropsResult<T> {
  const [styleProps, otherProps] = splitProps(props, stylePropsKeys);

  let isEmpty = true;
  let translatedProps = {};
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
