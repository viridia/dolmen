import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles';
import { spacing } from '../../styles/sizes';

export const asideStyle = recipe({
  base: {
    backgroundColor: theme.pageHeaderBg,
    boxShadow: `0 0 2px 0 ${theme.pageHeaderShadow}`,
    padding: spacing.lg,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  },
});

export type AsideStyleProps = RecipeVariants<typeof asideStyle>;
