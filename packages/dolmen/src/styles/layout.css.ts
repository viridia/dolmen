import { CSSProperties } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const standardSpacing = (propName: keyof CSSProperties) => ({
  xs: { [propName]: 1 },
  sm: { [propName]: 2 },
  md: { [propName]: 4 },
  lg: { [propName]: 8 },
  xl: { [propName]: 12 },
});

export const layout = recipe({
  base: {},

  variants: {
    m: standardSpacing('margin'),
    mt: standardSpacing('marginTop'),
    mb: standardSpacing('marginBottom'),
    ml: standardSpacing('marginLeft'),
    m4: standardSpacing('marginRight'),
    p: standardSpacing('padding'),
    pt: standardSpacing('paddingTop'),
    pb: standardSpacing('paddingBottom'),
    pl: standardSpacing('paddingLeft'),
    p4: standardSpacing('paddingRight'),
  },
});

export type LayoutStyles = RecipeVariants<typeof layout>;
