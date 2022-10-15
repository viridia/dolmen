import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles';
import { standardFontSizes } from '../../styles';

export const codeStyle = recipe({
  base: {
    fontFamily: theme.font.mono,
    fontSize: '1rem',
  },

  variants: {
    size: standardFontSizes('fontSize'),
  },
});

export type CodeStyleProps = RecipeVariants<typeof codeStyle>;

export const textStyle = recipe({
  base: {
    fontFamily: theme.font.body,
    fontSize: '1rem',
  },

  variants: {
    size: standardFontSizes('fontSize'),
  },
});

export type TextStyleProps = RecipeVariants<typeof textStyle>;

export const titleStyle = style({
  fontFamily: theme.font.title,
  fontWeight: 'bold',
  marginTop: 0,
  marginBottom: '0.3em',
});

globalStyle(`h1.${titleStyle}`, {
  fontSize: '2rem',
});

globalStyle(`h2.${titleStyle}`, {
  fontSize: '1.4rem',
});

globalStyle(`h3.${titleStyle}`, {
  fontSize: '1.2rem',
});

globalStyle(`h4.${titleStyle}`, {
  fontSize: '1rem',
});

globalStyle(`h5.${titleStyle}`, {
  fontSize: '0.9rem',
});
