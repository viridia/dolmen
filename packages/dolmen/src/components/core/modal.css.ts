import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme, scrollbars } from '../../styles';

export const modalStyle = recipe({
  base: {
    backgroundColor: theme.modal.bgColor,
    boxShadow: `0 0 5px 0 ${theme.modal.shadowColor}`,
    color: theme.textColor,
    alignItems: 'stretch',
    border: 'none',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    width: 'min(30rem, 95vw)',
    opacity: 0,
    padding: 0,
    transform: 'scale(0.7)',
    transition: 'opacity 0.3s linear, transform 0.3s linear',
    maxHeight: '85vh',

    selectors: {
      '&.entered,&.entering': {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  },

  variants: {
    size: {
      xl: {
        width: 'min(60rem, 95vw)',
      },
      lg: {
        width: 'min(50rem, 95vw)',
      },
      md: {
        width: 'min(40rem, 95vw)',
      },
      sm: {
        width: 'min(30rem, 95vw)',
      },
      xs: {
        width: 'min(20rem, 95vw)',
      },
      mini: {
        width: 'min(13rem, 95vw)',
      },
      tiny: {
        width: 'min(11rem, 95vw)',
      },
    },
  },
});

export const backdropStyle = style({
  backgroundColor: theme.modal.backdropColor,
  display: 'flex',
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 700,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s linear',

  selectors: {
    '&.entered,&.entering': {
      opacity: 1,
    },
  },
});

export const modalHeaderStyle = style({
  display: 'flex',
  alignItems: 'center',
  fontFamily: theme.font.title,
  fontWeight: 'bold',
  justifyContent: 'space-between',
  gap: '4px',
  padding: '0.8rem 1rem',
  borderBottom: `1px solid ${theme.modal.headerBorderColor}`,
  borderRadius: '5px 5px 0 0',
  backgroundColor: theme.modal.headerBgColor
})

export const modalBodyStyle = style({
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  fontFamily: theme.font.body,
  padding: '1rem',
  overflowY: 'auto',
  selectors: scrollbars
})

export const modalFooterStyle = style({
  display: 'flex',
  alignItems: 'center',
  fontFamily: theme.font.title,
  justifyContent: 'flex-end',
  gap: '4px',
  padding: '1rem',
})

export type ModalStyleProps = RecipeVariants<typeof modalStyle>;
