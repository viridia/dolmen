import { createContext, JSX, ParentComponent, Show, splitProps, useContext } from 'solid-js';
import { createCssTransition, createFocusTrap, CssTransitionState } from '../../hooks';
import { Close } from '../../icons';
import { Button } from './Button';
import { Portal } from 'solid-js/web';
import { DialogSizeVariant, flexKeys, flexProps, FlexProps } from '../../styles';

interface IModalContext {
  onClose?: () => void;
}

const ModalContext = createContext<IModalContext>();

interface ModalProps extends JSX.HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  size?: DialogSizeVariant;
  withClose?: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

const ModalHeader: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
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
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-modal-header': true,
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
  JSX.HTMLAttributes<HTMLDivElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-modal-body': true,
      }}
    />
  );
};

const ModalFooter: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);
  return (
    <footer
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-modal-footer': true,
      }}
    />
  );
};

const ModalDialogInner: ParentComponent<
  ModalProps & { state: CssTransitionState }
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
        'dm-modal': true,
        [`dm-size-${local.size}`]: Boolean(local.size),
        [props.state]: true,
      }}
      open
    />
  );
};

interface ModalDialogProps extends JSX.HTMLAttributes<HTMLDialogElement> {
  state: CssTransitionState;
  size?: DialogSizeVariant;
  withClose?: boolean;
  onClose?: () => void;
  onExited?: () => void;
  mount?: Node;
}

export const ModalDialog: ParentComponent<
  ModalDialogProps
> = props => {
  const [local, rest] = splitProps(props, ['withClose', 'children', 'mount']);

  return (
    <Portal mount={local.mount}>
      <div
        classList={{ 'dm-modal-backdrop': true, [props.state]: true }}
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

export const Modal: ParentComponent<ModalProps> & {
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
