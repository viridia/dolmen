import { ParentComponent, JSX, splitProps, Show, createContext, useContext } from 'solid-js';
import { createCssTransition, createFocusTrap, CssTransitionState } from '../../hooks';
import { Close } from '../../icons';
import Button from './Button';
import {
  backdropStyle,
  modalStyle,
  modalHeaderStyle,
  ModalStyleProps,
  modalFooterStyle,
  modalBodyStyle,
} from './modal.css';

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

const ModalHeader: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const context = useContext(ModalContext);
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [modalHeaderStyle]: true,
      }}
    >
      {local.children}
      <Show when={context?.onClose}>
        <Button color="subtle" size="xs" icon onClick={() => context.onClose()}>
          <Close />
        </Button>
      </Show>
    </header>
  );
};

const ModalBody: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [modalBodyStyle]: true,
      }}
    >
      {local.children}
    </div>
  );
};

const ModalFooter: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <footer
      {...rest}
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [modalFooterStyle]: true,
      }}
    >
      {local.children}
    </footer>
  );
};

const ModalDialogInner: ParentComponent<
  ModalProps & ModalStyleProps & { state: CssTransitionState }
> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'open',
    'withClose',
    'state',
    'class',
    'classList',
    'children',
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
        [local.class ?? '']: true,
        [modalStyle({ size: local.size })]: true,
        [props.state]: true,
      }}
      open
    >
      {local.children}
    </dialog>
  );
};

export const Modal: ParentComponent<ModalProps & ModalStyleProps> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = props => {
  const [local, rest] = splitProps(props, ['withClose', 'children']);
  const state = createCssTransition({ in: () => props.open, delay: 300, onExited: props.onExited });

  return (
    <Show when={state() !== 'exited'}>
      <div
        classList={{ [backdropStyle]: true, [state()]: true }}
        onClick={() => {
          props.onClose?.();
        }}
      >
        <ModalContext.Provider value={{ onClose: props.withClose ? props.onClose : undefined }}>
          <ModalDialogInner {...rest} state={state()}>
            {local.children}
          </ModalDialogInner>
        </ModalContext.Provider>
      </div>
    </Show>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
