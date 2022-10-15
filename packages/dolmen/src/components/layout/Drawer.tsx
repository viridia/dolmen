import { createMemo, createSignal, onMount, ParentComponent, Show } from 'solid-js';
import { JSX, splitProps } from 'solid-js';
import { isServer } from 'solid-js/web';
import { createCssTransition, CssTransitionState } from '../../hooks';
import { classes } from '../../styles';
import {
  drawerContainerStyle,
  drawerContentStyle,
  drawerHeaderStyle,
  drawerModalContainerStyle,
  drawerModalStyle,
  drawerCoplanarStyle,
} from './drawer.css';
import { LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

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

const DrawerHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={classes(local.classList, layoutStyle, local.class, drawerHeaderStyle)}
    >
      {local.children}
    </div>
  );
};

const DrawerContent: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={classes(local.classList, layoutStyle, local.class, drawerContentStyle)}
    >
      {local.children}
    </div>
  );
};

interface DrawerInnerProps {
  mode?: DrawerMode;
  state: CssTransitionState;
  side: Side;
  size: string;
  parent: HTMLDivElement;
}

export const DrawerInner: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & DrawerInnerProps
> = props => {
  const [local, rest] = splitProps(props, [
    'mode',
    'side',
    'size',
    'state',
    'parent',
    'class',
    'classList',
    'children',
  ]);
  let [direction, setDirection] = createSignal<string | null>(null);

  onMount(() => {
    setDirection(getComputedStyle(local.parent).direction);
  });

  return (
    <Show when={direction() !== null}>
      <aside
        {...rest}
        classList={classes(
          local.classList,
          local.class,
          local.mode === 'modal'
            ? drawerModalStyle({ side: adjustedSide(local.side, direction() === 'rtl') })
            : drawerCoplanarStyle({
                side: adjustedSide(local.side, direction() === 'rtl'),
              }),
          local.state
        )}
        style={{
          [isHorizontal(local.side) ? 'width' : 'height']: local.size,
        }}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {local.children}
      </aside>
    </Show>
  );
};

export const Drawer: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & DrawerProps> & {
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
    'children',
  ]);
  let containerElt: HTMLDivElement;
  const state = createCssTransition({ in: () => props.open, delay: 300 });

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
    <Show when={state() !== 'exited'}>
      <div
        ref={containerElt}
        classList={{
          [local.mode === 'modal' ? drawerModalContainerStyle : drawerContainerStyle]: true,
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
          parent={containerElt}
        >
          {local.children}
        </DrawerInner>
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

export default Drawer;
