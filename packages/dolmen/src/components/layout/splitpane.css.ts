import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles';

export const splitPaneStyle = recipe({
  base: {
    alignItems: 'stretch',
    flex: '1 0 0',
    display: 'flex',
    padding: 0,
    overflow: 'hidden',
  },

  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});

export const splitBarStyle = style({
  alignSelf: 'stretch',
  backgroundColor: theme.splitpane.splitterBgColor,
  boxShadow: `0 0 2px 0 ${theme.splitpane.splitterShadowColor}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '10px',
  minHeight: '10px',
  userSelect: 'none',

  selectors: {
    '&.horizontal': {
      cursor: 'col-resize',
      // borderWidth: '0 1px 0 1px',
    },

    '&.vertical': {
      cursor: 'row-resize',
      // borderWidth: '1px 0 1px 0',
    },
  },
});

export const splitBarDetailStyle = style({
  backgroundColor: theme.splitpane.splitterDetailColor,
  userSelect: 'none',

  selectors: {
    '.horizontal > &': {
      width: '3px',
      height: '64px',
    },

    '.vertical > &': {
      width: '64px',
      height: '3px',
    },
  },
});

export const splitSegmentStyle = style({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  overflow: 'hidden',
  minWidth: 0,
  minHeight: 0,
  flexBasis: 0,
});

export type SplitPaneStyleProps = RecipeVariants<typeof splitPaneStyle>;
