import {
  Accessor,
  createEffect,
  createSignal,
  For,
  JSX,
  Match,
  onCleanup,
  Setter,
  Show,
  Switch,
  VoidComponent,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { createCssTransition } from '../../hooks';
import { Info, Success, Warning, Error } from '../../icons';

const defaultTimeout = 30000;

type ToastPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface IToastInput {
  severity?: 'success' | 'info' | 'warning' | 'error';
  title: JSX.Element;
  body: JSX.Element;
  timeout?: number;
  placement?: ToastPlacement;
}

interface IToast extends IToastInput {
  id: string;
  visible: Accessor<boolean>;
  setVisible: Setter<boolean>;
  timeout: number;
  placement: ToastPlacement;
}

const Toast: VoidComponent<IToast> = props => {
  const state = createCssTransition({
    in: () => props.visible(),
    delay: 400,
    onExited: () => {
      setToastQueue(queue => queue.filter(toast => toast.id !== props.id));
    },
  });

  createEffect(() => {
    props.setVisible(true);
    if (props.timeout > 0) {
      const timer = setTimeout(() => {
        props.setVisible(false);
      }, props.timeout);
      onCleanup(() => clearTimeout(timer));
    }
  });

  return (
    <div
      role="alert"
      classList={{
        'dm-toast': true,
        [`dm-${props.severity}`]: Boolean(props.severity),
        [state()]: true,
      }}
      onClick={() => {
        props.setVisible(false);
      }}
      data-placement={props.placement}
    >
      <Switch>
        <Match when={props.severity === 'success'}>
          <div class="dm-toast-icon">
            <Success width={16} />
          </div>
        </Match>
        <Match when={props.severity === 'info'}>
          <div class="dm-toast-icon">
            <Info width={16} />
          </div>
        </Match>
        <Match when={props.severity === 'warning'}>
          <div class="dm-toast-icon">
            <Warning width={16} />
          </div>
        </Match>
        <Match when={props.severity === 'error'}>
          <div class="dm-toast-icon">
            <Error width="16px" />
          </div>
        </Match>
      </Switch>
      <div class="dm-toast-content">
        <Show when={props.title}>
          <div class="dm-toast-title">{props.title}</div>
        </Show>
        <Show when={props.body}>
          <div class="dm-toast-body">{props.body}</div>
        </Show>
      </div>
    </div>
  );
};

interface FrameProps {
  mount?: Node;
}

export const ToastFrame: VoidComponent<FrameProps> = props => {
  const [ref, setRef] = createSignal<HTMLDivElement | undefined>(undefined);

  createEffect(() => {
    const elt = ref();
    if (elt) {
      const observer = new MutationObserver(() => {
        const positions: Record<ToastPlacement, number> = {
          'bottom-left': 16,
          'bottom-right': 16,
          'top-left': 16,
          'top-right': 16,
        };

        for (const c of elt.children) {
          const child = c as HTMLElement;
          const placement = child.dataset.placement as ToastPlacement;
          if (placement) {
            const prevPosition = positions[placement] ?? 16;
            if (placement.startsWith('bottom')) {
              child.style.bottom = `${prevPosition}px`;
            } else {
              child.style.top = `${prevPosition}px`;
            }
            positions[placement] = prevPosition + 8 + child.offsetHeight;
          }
        }
      });

      observer.observe(elt, {
        childList: true,
      });
      onCleanup(() => observer.disconnect());
    }
  });

  return props.mount ? (
    <Portal mount={props.mount}>
      <div ref={setRef} class="dm-toast-frame">
        <For each={toastQueue()}>{toast => <Toast {...toast} />}</For>
      </div>
    </Portal>
  ) : (
    <div ref={setRef} class="dm-toast-frame">
      <For each={toastQueue()}>{toast => <Toast {...toast} />}</For>
    </div>
  );
};

type ToastFn = (input: IToastInput) => string;
const [toastQueue, setToastQueue] = createSignal<IToast[]>([]);

let nextId = 1;
let defaultPlacement: ToastPlacement = 'bottom-left';

function configure(options: { placement?: ToastPlacement; timeout?: number }) {
  if (options.placement) {
    defaultPlacement = options.placement;
  }
}

export const toast: ToastFn & {
  error: ToastFn;
  success: ToastFn;
  warning: ToastFn;
  info: ToastFn;
  configure: typeof configure;
} = (input: IToastInput) => {
  const id = `${nextId++}`;
  const [visible, setVisible] = createSignal(false);
  setToastQueue(queue => [
    {
      id,
      severity: input.severity,
      title: input.title,
      body: input.body,
      placement: input.placement ?? defaultPlacement,
      timeout: input.timeout ?? defaultTimeout,
      visible,
      setVisible,
    },
    ...queue,
  ]);
  return id;
};

toast.success = input => toast({ ...input, severity: 'success' });
toast.info = input => toast({ ...input, severity: 'info' });
toast.warning = input => toast({ ...input, severity: 'warning' });
toast.error = input => toast({ ...input, severity: 'error' });
toast.configure = configure;
