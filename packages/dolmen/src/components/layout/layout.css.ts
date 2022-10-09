import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles';
import { spacing } from '../../styles/sizes';

export const spacerStyle = style({
  flex: 1,
});

export const stackStyle = style({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

export const groupStyle = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
});

export const pageStyle = style({
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
});

export const asideStyle = style({
  backgroundColor: theme.pageHeaderBg,
  boxShadow: `0 0 2px 0 ${theme.pageHeaderShadow}`,
  padding: spacing.lg,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const pageHeaderStyle = style({
  backgroundColor: theme.pageHeaderBg,
  boxShadow: `0 0 2px 0 ${theme.pageHeaderShadow}`,
  gap: spacing.md,
  padding: spacing.lg,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: 1,
});

// Note: order matters. This needs to come last.
export const layoutStyle = recipe({
  base: {},

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
      none: {
        gap: 0,
      },
    },

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

    justifyContent: {
      start: {
        justifyContent: 'start',
      },
      end: {
        justifyContent: 'end',
      },
      flexStart: {
        justifyContent: 'flex-start',
      },
      flexEnd: {
        justifyContent: 'flex-end',
      },
      left: {
        justifyContent: 'left',
      },
      right: {
        justifyContent: 'right',
      },
      center: {
        justifyContent: 'center',
      },
      normal: {
        justifyContent: 'normal',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      spaceAround: {
        justifyContent: 'space-around',
      },
      spaceEvenly: {
        justifyContent: 'space-evenly',
      },
      stretch: {
        justifyContent: 'stretch',
      },
    },
  },
});

export type LayoutStyleProps = RecipeVariants<typeof layoutStyle>;
