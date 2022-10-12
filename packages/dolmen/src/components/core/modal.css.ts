import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '../../styles/theme.css';

export const modalStyle = recipe({
  base: {
    backgroundColor: theme.modal.bgColor,
    boxShadow: `0 0 3px 0 ${theme.modal.shadowColor}`,
    color: theme.textColor,
    alignItems: 'stretch',
    borderColor: theme.shadowColor,
    borderRadius: 3,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    width: 'min(30rem, 95vw)',
    opacity: 0,
    padding: 0,
    transform: 'scale(0.7)',
    transition: 'opacity 0.3s linear, transform 0.3s linear',
    top: '30%',

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
        width: 'min(50rem, 95vw)',
      },
      lg: {
        width: 'min(40rem, 95vw)',
      },
      md: {
        width: 'min(30rem, 95vw)',
      },
      sm: {
        width: 'min(20rem, 95vw)',
      },
      xs: {
        width: 'min(15rem, 95vw)',
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
  padding: '1rem',
})

export const modalBodyStyle = style({
  display: 'flex',
  alignItems: 'stretch',
  fontFamily: theme.font.body,
  padding: '1rem',
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
