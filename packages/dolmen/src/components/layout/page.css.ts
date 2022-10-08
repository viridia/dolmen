import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles';

export const pageStyle = recipe({
  base: {
    backgroundColor: theme.pageColor,
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: 0,
    fontFamily: theme.font.body,
  },

  variants: {
    flexDirection: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
    },
  },
});

export type PageStyleProps = RecipeVariants<typeof pageStyle>;
