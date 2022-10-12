import { Accessor, createEffect, createRenderEffect, createSignal, onCleanup } from 'solid-js';

interface Props {
  in?: Accessor<boolean>;
  delay?: number;
  exitDelay?: number;
  onExited?: () => void;
}

export type CssTransitionState =
  | 'enter-start'
  | 'entering'
  | 'entered'
  | 'exit-start'
  | 'exiting'
  | 'exited';

export const createCssTransition = ({
  delay = 100,
  exitDelay,
  onExited,
  in: inside,
}: Props): Accessor<CssTransitionState> => {
  const [state, setState] = createSignal<CssTransitionState>('exited');

  createRenderEffect(() => {
    if (inside()) {
      if (state() === 'exited' || state() === 'exiting') {
        setState('enter-start');
      }
    } else {
      if (state() === 'entering' || state() === 'entered') {
        setState('exit-start');
      }
    }
  });

  createEffect(() => {
    const st = state();
    if (st === 'entering' || st === 'exiting') {
      const timer = window.setTimeout(
        () => {
          if (st === 'exiting') {
            setState('exited');
            onExited && onExited();
          } else if (st === 'entering') {
            setState('entered');
          }
        },
        st === 'entering' ? delay : exitDelay ?? delay
      );

      onCleanup(() => window.clearTimeout(timer));
    } else if (st === 'enter-start') {
      window.requestAnimationFrame(() => {
        setState('entering');
      });
    } else if (st === 'exit-start') {
      window.requestAnimationFrame(() => {
        setState('exiting');
      });
    }
  });

  return state;
};
