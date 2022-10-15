import { createVar, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme, Z } from '../../styles';

export const drawerPosition = createVar();

export const drawerCoplanarStyle = recipe({
  base: {
    backgroundColor: theme.surfaceColor,
    boxShadow: `0 0 4px 0 ${theme.shadowColor}`,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  variants: {
    side: {
      start: {
        left: 'auto',
      },
      end: {
        right: 'auto',
      },
      left: {
        left: 'auto',
      },
      right: {
        right: 'auto',
      },
      top: {
        top: 'auto',
      },
      bottom: {
        bottom: 'auto',
      },
    },
  },
});

export const drawerModalStyle = recipe({
  base: {
    backgroundColor: theme.surfaceColor,
    boxShadow: `0 0 4px 0 ${theme.shadowColor}`,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: 'transform 0.5s ease',
  },

  variants: {
    side: {
      start: {
        right: 'auto',
        transform: 'translateX(-100%)',
        selectors: {
          '&.entered,&.entering': {
            transform: 'translateX(0)',
          },
        },
      },
      end: {
        left: 'auto',
        transform: 'translateX(100%)',
        selectors: {
          '&.entered,&.entering': {
            transform: 'translateX(0)',
          },
        },
      },
      left: {
        right: 'auto',
        transform: 'translateX(-100%)',
        selectors: {
          '&.entered,&.entering': {
            transform: 'translateX(0)',
          },
        },
      },
      right: {
        left: 'auto',
        transform: 'translateX(100%)',
        selectors: {
          '&.entered,&.entering': {
            transform: 'translateX(0)',
          },
        },
      },
      top: {
        bottom: 'auto',
        transform: 'translateY(-100%)',
        selectors: {
          '&.entered,&.entering': {
            transform: 'translateY(0)',
          },
        },
      },
      bottom: {
        top: 'auto',
        transform: 'translateY(100%)',
        selectors: {
          '&.entered,&.entering': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
});

export const drawerContainerStyle = style({
  display: 'flex',
  transition: 'width 0.3s ease, height 0.3s ease',
  position: 'relative',
});

export const drawerModalContainerStyle = style({
  backgroundColor: 'transparent',
  display: 'flex',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: Z.Modal,
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s linear',

  selectors: {
    '&.entered,&.entering': {
      backgroundColor: theme.modal.backdropColor,
    },
  },
});

export const drawerHeaderStyle = style({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '8px 1rem',
  margin: 0,
  height: '2rem',
  borderBottom: `1px solid ${theme.shadowColor}`,
});

export const drawerContentStyle = style({
  alignItems: 'start',
  alignSelf: 'stretch',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'start',
  padding: '8px 1rem',
  margin: 0,
});

export type DrawerStyleProps = RecipeVariants<typeof drawerCoplanarStyle>;
