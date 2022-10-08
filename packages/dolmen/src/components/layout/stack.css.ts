import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { spacing } from '../../styles/sizes';

export const stackStyle = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },

  variants: {
    gap: {
      xl: {
        gap: spacing.xl,
      },
      lg: {
        gap: spacing.lg,
      },
      md: {
        gap: spacing.md,
      },
      sm: {
        gap: spacing.sm,
      },
      xs: {
        gap: spacing.xs,
      },
    },

    alignItems: {
      start: {
        alignItems: 'start',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      center: {
        alignItems: 'center',
      },
    },
  },
});

export type StackStyleProps = RecipeVariants<typeof stackStyle>;
