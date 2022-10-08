import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles';
import { spacing } from '../../styles/sizes';

export const pageHeaderStyle = recipe({
  base: {
    backgroundColor: theme.pageHeaderBg,
    boxShadow: `0 0 2px 0 ${theme.pageHeaderShadow}`,
    gap: spacing.md,
    padding: spacing.lg,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
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

export type AppHeaderStyleProps = RecipeVariants<typeof pageHeaderStyle>;
