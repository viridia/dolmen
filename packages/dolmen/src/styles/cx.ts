import { CSSProperties } from '@stitches/core';
import { Property } from '@stitches/core/types/css';
import { CssComponent } from '@stitches/core/types/styled-component';
import { css } from './css';
import { Space, space } from './size';
import { Z, ZIndices } from './z';

const spaceAlias = (s: string | number) => (typeof s === 'string' && space[s as Space]) || s;

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
const converters = {
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
    css.maxHeight = value;
  },

  minHeight: (value: Property.MinHeight, css: CSSProperties) => {
    css.minHeight = value;
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

  flex: (value: Property.Flex, css: CSSProperties) => {
    css.flex = value;
  },

  alignSelf: (value: Property.AlignSelf, css: CSSProperties) => {
    css.alignSelf = value;
  },

  position: (value: Property.Position, css: CSSProperties) => {
    css.position = value;
  },

  gap: (value: Property.Gap | Space, css: CSSProperties) => {
    css.gap = spaceAlias(value);
  },

  rowGap: (value: Property.RowGap | Space, css: CSSProperties) => {
    css.rowGap = spaceAlias(value);
  },

  columnGap: (value: Property.ColumnGap | Space, css: CSSProperties) => {
    css.columnGap = spaceAlias(value);
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

type StyleConverters = typeof converters;

type StyleArgument<T> = T extends (value: infer Arg, css: CSSProperties) => unknown ? Arg : never;
type StyleProps = {
  [k in keyof StyleConverters]?: StyleArgument<StyleConverters[k]>;
};

/** Function that accepts a list of class names and individual styles. These are combined
    together into a single `classList` object suitable for passing to a Solid component.
 */
export function cx(...styles: (StyleProps | string)[]): Record<string, boolean> {
  const classList: Record<string, boolean> = {};
  const translatedProps = {};
  let hasDynamic = false;
  for (const classNameOrStyles of styles) {
    if (typeof classNameOrStyles === 'string') {
      classList[classNameOrStyles] = true;
    } else if ((classNameOrStyles as CssComponent).className) {
      classList[(classNameOrStyles as CssComponent).className] = true;
    } else {
      for (const key in classNameOrStyles) {
        hasDynamic = true;
        const converter = converters[key as keyof StyleConverters] as (
          value: unknown,
          props: CSSProperties
        ) => string;
        if (converter) {
          converter(classNameOrStyles[key as keyof StyleConverters], translatedProps);
        }
      }
    }
  }

  if (hasDynamic) {
    const style = css({ '&&': translatedProps }); // Use '&' to bump cascade priority
    classList[style()] = true;
  }

  return classList;
}
