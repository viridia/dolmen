import { CSSProperties, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme, Z } from '../../styles';
import { spacing, standardLength } from '../../styles';

function standardLength2(
  prop1: keyof CSSProperties,
  prop2: keyof CSSProperties
): Record<keyof typeof spacing, CSSProperties> {
  return {
    xl: {
      [prop1]: spacing.xl,
      [prop2]: spacing.xl,
    },
    lg: {
      [prop1]: spacing.lg,
      [prop2]: spacing.lg,
    },
    md: {
      [prop1]: spacing.md,
      [prop2]: spacing.md,
    },
    sm: {
      [prop1]: spacing.sm,
      [prop2]: spacing.sm,
    },
    xs: {
      [prop1]: spacing.xs,
      [prop2]: spacing.xs,
    },
    none: {
      [prop1]: 0,
      [prop2]: 0,
    },
  };
}

export const spacerStyle = style({
  flex: 1,
});

export const stackStyle = style({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

export const cardStyle = style({
  alignItems: 'stretch',
  backgroundColor: theme.surfaceColor,
  borderRadius: 4,
  boxShadow: `0 1px 2px 0 ${theme.shadowColor}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

export const cardContentStyle = style({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  margin: 0,
  padding: '8px',
});

export const groupStyle = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
});

export const pageStyle = style({
  backgroundColor: theme.backgroundColor,
  color: theme.textColor,
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
  backgroundColor: theme.surfaceColor,
  boxShadow: `0 0 2px 0 ${theme.shadowColor}`,
  padding: spacing.lg,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const pageHeaderStyle = style({
  alignItems: 'center',
  backgroundColor: theme.surfaceColor,
  boxShadow: `0 0 2px 0 ${theme.shadowColor}`,
  display: 'flex',
  flexDirection: 'row',
  fontFamily: theme.font.body,
  gap: spacing.md,
  justifyContent: 'space-between',
  padding: '8px 1rem',
  zIndex: Z.PageHeader,
});

export const pageHeaderTitleStyle = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: theme.font.title,
  fontWeight: 600,
  justifyContent: 'start',
  padding: 0,
});

// Note: order matters. This needs to come last.
export const layoutStyle = recipe({
  base: {},

  variants: {
    margin: standardLength('margin'),
    marginLeft: standardLength('marginLeft'),
    marginRight: standardLength('marginRight'),
    marginTop: standardLength('marginTop'),
    marginBottom: standardLength('marginBottom'),
    marginX: standardLength2('marginLeft', 'marginRight'),
    marginY: standardLength2('marginTop', 'marginBottom'),
    ml: standardLength('marginLeft'),
    mr: standardLength('marginRight'),
    mt: standardLength('marginTop'),
    mb: standardLength('marginBottom'),
    padding: standardLength('padding'),
    paddingLeft: standardLength('paddingLeft'),
    paddingRight: standardLength('paddingRight'),
    paddingTop: standardLength('paddingTop'),
    paddingBottom: standardLength('paddingBottom'),
    paddingX: standardLength2('paddingLeft', 'paddingRight'),
    paddingY: standardLength2('paddingTop', 'paddingBottom'),
    pl: standardLength('paddingLeft'),
    pr: standardLength('paddingRight'),
    pt: standardLength('paddingTop'),
    pb: standardLength('paddingBottom'),
    gap: standardLength('gap'),

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

    alignSelf: {
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
