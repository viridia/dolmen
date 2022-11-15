import { createContext, JSX, ParentComponent, Show, splitProps, useContext } from 'solid-js';
import { createCssTransition, createFocusTrap, CssTransitionState } from '../../hooks';
import { Close } from '../../icons';
import { css, scrollbars, Z } from '../../styles';
import { Button } from './Button';
import { VariantProps } from '@stitches/core';
import { Portal } from 'solid-js/web';
import { flexKeys, flexPropsCss } from '../layout/flexProps';

interface IModalContext {
  onClose?: () => void;
}

const ModalContext = createContext<IModalContext>();

interface ModalProps extends JSX.HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  withClose?: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

const modalCss = css({
  backgroundColor: '$elevation1',
  boxShadow: '0 0 3px 0 $colors$shadow',
  color: '$text',
  alignItems: 'stretch',
  border: 'none',
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  width: 'min(30rem, 95vw)',
  opacity: 0,
  padding: 0,
  transform: 'scale(0.7)',
  transition: 'opacity 0.3s linear, transform 0.3s ease',
  maxHeight: '85vh',

  '&.entered,&.entering': {
    opacity: 1,
    transform: 'scale(1)',
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
      xxs: {
        width: 'min(16rem, 95vw)',
      },
      xxxs: {
        width: 'min(14rem, 95vw)',
      },
    },
  },
});

const backdropCss = css({
  backgroundColor: '$backdrop',
  display: 'flex',
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: Z.modal,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s linear',

  '&.entered,&.entering': {
    opacity: 1,
  },
});

const modalHeaderCss = css(flexPropsCss, {
  '@layer ui-base': {
    display: 'flex',
    alignItems: 'center',
    fontFamily: '$title',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    gap: '4px',
    padding: '0.8rem 1rem',
    borderBottom: '1px solid $colors$elevation0',
    borderRadius: '5px 5px 0 0',
    backgroundColor: '$elevation2',
  },
});

const modalBodyCss = css(
  flexPropsCss,
  {
    '@layer ui-base': {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
      fontFamily: '$body',
      padding: '0.8rem 1rem 0.8rem 1rem',
      overflowY: 'auto',
    },
  },
  scrollbars
);

const modalFooterCss = css(flexPropsCss, {
  '@layer ui-base': {
    display: 'flex',
    alignItems: 'center',
    fontFamily: '$body',
    justifyContent: 'flex-end',
    gap: '4px',
    padding: '0.4rem 1rem 0.8rem 1rem',
  },
});

const ModalHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof modalHeaderCss>
> = props => {
  const context = useContext(ModalContext);
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', ...flexKeys]);

  if (!context) {
    throw new Error('ModalHeader used outside of Modal context');
  }

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [modalHeaderCss(local)]: true,
      }}
    >
      {local.children}
      <Show when={context?.onClose}>
        <Button color="subtle" size="xs" icon onClick={() => context.onClose?.()} type="button">
          <Close width={20} />
        </Button>
      </Show>
    </header>
  );
};

const ModalBody: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & VariantProps<typeof modalBodyCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [modalBodyCss(local)]: true,
      }}
    />
  );
};

const ModalFooter: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof modalFooterCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);
  return (
    <footer
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [modalFooterCss(local)]: true,
      }}
    />
  );
};

const ModalDialogInner: ParentComponent<
  ModalProps & VariantProps<typeof modalCss> & { state: CssTransitionState }
> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'open',
    'withClose',
    'state',
    'class',
    'classList',
  ]);
  const { focusProps } = createFocusTrap({
    onKeyDown(e) {
      e.stopPropagation();
      switch (e.key) {
        case 'Escape': {
          props.onClose?.();
        }
      }
    },
  });

  return (
    <dialog
      {...rest}
      {...focusProps}
      aria-role="dialog"
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [modalCss({ size: local.size })]: true,
        [props.state]: true,
      }}
      open
    />
  );
};

interface ModalDialogProps extends JSX.HTMLAttributes<HTMLDialogElement> {
  state: CssTransitionState;
  withClose?: boolean;
  onClose?: () => void;
  onExited?: () => void;
  mount?: Node;
}

export const ModalDialog: ParentComponent<
  ModalDialogProps & VariantProps<typeof modalCss>
> = props => {
  const [local, rest] = splitProps(props, ['withClose', 'children', 'mount']);

  return (
    <Portal mount={local.mount}>
      <div
        classList={{ [backdropCss()]: true, 'dm-backdrop': true, [props.state]: true }}
        onClick={() => {
          props.onClose?.();
        }}
      >
        <ModalContext.Provider value={{ onClose: props.withClose ? props.onClose : undefined }}>
          <ModalDialogInner
            {...rest}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {local.children}
          </ModalDialogInner>
        </ModalContext.Provider>
      </div>
    </Portal>
  );
};

export const Modal: ParentComponent<ModalProps & VariantProps<typeof modalCss>> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Dialog: typeof ModalDialog;
} = props => {
  const state = createCssTransition({
    in: () => !!props.open,
    delay: 300,
    onExited: props.onExited,
  });

  return (
    <Show when={state() !== 'exited'}>
      <ModalDialog {...props} state={state()} />
    </Show>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;
