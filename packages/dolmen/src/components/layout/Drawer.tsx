import { createMemo, createSignal, onMount, ParentComponent, Show } from 'solid-js';
import { JSX, splitProps } from 'solid-js';
import { createCssTransition, CssTransitionState } from '../../hooks';
import { flexKeys, FlexProps, flexProps } from '../../styles';

type Side = 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom';
type DrawerMode = 'modal' | 'coplanar';

interface DrawerProps {
  mode?: DrawerMode;
  open?: boolean;
  side: Side;
  size?: string | number;
  minSize?: string | number;
  onClose?: () => void;
}

const DrawerHeader: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & FlexProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-drawer-header': true,
      }}
    />
  );
};

const DrawerContent: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & FlexProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-drawer-content': true,
      }}
    />
  );
};

interface DrawerInnerProps {
  mode?: DrawerMode;
  state: CssTransitionState;
  side: Side;
  size: string;
  parent: HTMLDivElement;
}

const DrawerInner: ParentComponent<JSX.HTMLAttributes<HTMLElement> & DrawerInnerProps> = props => {
  const [local, rest] = splitProps(props, [
    'mode',
    'side',
    'size',
    'state',
    'parent',
    'class',
    'classList',
  ]);
  const [direction, setDirection] = createSignal<string | null>(null);

  onMount(() => {
    setDirection(getComputedStyle(local.parent).direction);
  });

  return (
    <Show when={direction() !== null}>
      <aside
        {...rest}
        classList={{
          ...local.classList,
          [local.class as string]: !!local.class,
          [local.mode === 'modal' ? 'dm-drawer-modal' : 'dm-drawer-coplanar']: true,
          [`dm-side-${adjustedSide(local.side, direction() === 'rtl')}`]: true,
          [local.state]: true,
        }}
        style={{
          [isHorizontal(local.side) ? 'width' : 'height']: local.size,
        }}
        onClick={e => {
          e.stopPropagation();
        }}
      />
    </Show>
  );
};

export const Drawer: ParentComponent<JSX.HTMLAttributes<HTMLElement> & DrawerProps> & {
  Header: typeof DrawerHeader;
  Content: typeof DrawerContent;
} = props => {
  const [local, rest] = splitProps(props, [
    'mode',
    'open',
    'onClose',
    'side',
    'size',
    'minSize',
    'class',
    'classList',
  ]);
  let containerElt: HTMLDivElement;
  const state = createCssTransition({ in: () => !!props.open, delay: 300 });

  const openSize = createMemo<string>(() =>
    local.size === undefined
      ? '200px'
      : typeof local.size === 'number' && local.size !== 0
      ? `${local.size}px`
      : `${local.size}`
  );

  const closedSize = createMemo<string>(() =>
    local.minSize === undefined
      ? '0'
      : typeof local.minSize === 'number' && local.minSize > 0
      ? `${local.minSize}px`
      : `${local.minSize}`
  );

  return (
    <Show when={state() !== 'exited' || local.minSize !== undefined}>
      <div
        ref={containerElt!}
        classList={{
          [local.mode === 'modal' ? 'dm-drawer-modal-container' : 'dm-drawer-container']: true,
          [state()]: true,
        }}
        style={{
          [isHorizontal(local.side) ? 'width' : 'height']:
            local.mode === 'modal'
              ? undefined
              : state() === 'entering' || state() === 'entered'
              ? openSize()
              : closedSize(),
        }}
        onMouseDown={e => {
          e.stopPropagation();
          local.onClose?.();
        }}
      >
        <DrawerInner
          {...rest}
          mode={local.mode}
          side={local.side}
          state={state()}
          size={openSize()}
          parent={containerElt!}
        />
      </div>
    </Show>
  );
};

Drawer.Header = DrawerHeader;
Drawer.Content = DrawerContent;

function isHorizontal(side: Side) {
  return side === 'left' || side === 'right' || side === 'start' || side === 'end';
}

function adjustedSide(side: Side, rtl: boolean) {
  if (rtl) {
    if (side === 'start') {
      return 'right';
    } else if (side === 'end') {
      return 'left';
    }
  }
  return side;
}
