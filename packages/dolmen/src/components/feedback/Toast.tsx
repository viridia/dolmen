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
import { css, fontSize, theme } from '../../styles';

const defaultTimeout = 30000;

const toastFrameCss = css({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  pointerEvents: 'none',
  padding: 16,
  fontFamily: theme.fonts.body,
  gap: 8,
});

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

const toastCss = css({
  backgroundColor: theme.colors.elevation2,
  borderRadius: '4px',
  borderLeft: `8px solid ${theme.colors.btnSelected.value}`,
  color: theme.colors.text,
  display: 'flex',
  flexDirection: 'row',
  fontSize: fontSize.md,
  gap: 6,
  padding: '4px 8px',
  width: '18rem',
  boxShadow: '0 0 3px 0 $colors$shadow',
  pointerEvents: 'all',
  cursor: 'pointer',
  transform: 'translate(0, 0)',
  transition: 'transform 0.4s ease, top 0.4s ease, bottom 0.4s ease',
  position: 'absolute',

  '&.entering, &.entered': {
    transform: 'translate(0, 0)',
  },

  variants: {
    severity: {
      success: {
        borderColor: theme.colors.successIcon,
        backgroundColor: theme.colors.successBg,
        color: theme.colors.successText,
        '--icon-color': theme.colors.successIcon,
      },
      info: {
        borderColor: theme.colors.infoIcon,
        backgroundColor: theme.colors.infoBg,
        color: theme.colors.infoText,
        '--icon-color': theme.colors.infoIcon,
      },
      warning: {
        borderColor: theme.colors.warningIcon,
        backgroundColor: theme.colors.warningBg,
        color: theme.colors.warningText,
        '--icon-color': theme.colors.warningIcon,
      },
      error: {
        borderColor: theme.colors.errorIcon,
        backgroundColor: theme.colors.errorBg,
        color: theme.colors.errorText,
        '--icon-color': theme.colors.errorIcon,
      },
    },

    placement: {
      'top-left': {
        transform: 'translateX(-120%)',
        left: 16,
      },

      'top-right': {
        transform: 'translateX(120%)',
        right: 16,
      },

      'bottom-left': {
        transform: 'translateX(-120%)',
        left: 16,
      },

      'bottom-right': {
        transform: 'translateX(120%)',
        right: 16,
      },
    },
  },
});

const toastContentCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 8,
  padding: '2px 0',
});

const toastIconCss = css({
  width: 20,
});

const toastTitleCss = css({
  fontWeight: 'bold',
});

const toastBodyCss = css({
  fontWeight: 'normal',
  fontSize: fontSize.sm,
});

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
        [toastCss({
          severity: props.severity,
          placement: props.placement,
        })]: true,
        [state()]: true,
      }}
      onClick={() => {
        props.setVisible(false);
      }}
      data-placement={props.placement}
    >
      <Switch>
        <Match when={props.severity === 'success'}>
          <div class={toastIconCss()}>
            <Success width={16} />
          </div>
        </Match>
        <Match when={props.severity === 'info'}>
          <div class={toastIconCss()}>
            <Info width={16} />
          </div>
        </Match>
        <Match when={props.severity === 'warning'}>
          <div class={toastIconCss()}>
            <Warning width={16} />
          </div>
        </Match>
        <Match when={props.severity === 'error'}>
          <div class={toastIconCss()}>
            <Error width="16px" />
          </div>
        </Match>
      </Switch>
      <div class={toastContentCss()}>
        <Show when={props.title}>
          <div class={toastTitleCss()}>{props.title}</div>
        </Show>
        <Show when={props.body}>
          <div class={toastBodyCss()}>{props.body}</div>
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

  return (
    <Portal mount={props.mount}>
      <div ref={setRef} class={toastFrameCss()}>
        <For each={toastQueue()}>{toast => <Toast {...toast} />}</For>
      </div>
    </Portal>
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
