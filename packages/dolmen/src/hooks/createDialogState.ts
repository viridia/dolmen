import { Accessor, createSignal, Setter } from 'solid-js';
import { createCssTransition, CssTransitionState } from './createCssTransition';

export interface IDialogStateOptions {
  delay?: number;
  exitDelay?: number;
  onExited?: () => void;
}

export interface IDialogState {
  visible: boolean;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  modalProps: {
    state: CssTransitionState;
    onClose: () => void;
  };
}

/** Hook used to explicitly manage the state of the dialog, including opening and closing
    transitions. The main use case for this is dialogs whose code is lazy-loaded when the
    dialog is shown for the first time.
 */
export function createDialogState(options: IDialogStateOptions = {}): IDialogState {
  const [open, setOpen] = createSignal(false);
  const state = createCssTransition({ in: open, delay: 300, ...options });

  return {
    get visible() {
      return state() !== 'exited';
    },
    open,
    setOpen,
    modalProps: {
      get state() {
        return state();
      },
      onClose: () => setOpen(false),
    },
  };
}
