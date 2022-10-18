import { createMemo, createSignal, onMount, ParentComponent, Show } from 'solid-js';
import { JSX, splitProps } from 'solid-js';
import { createCssTransition, CssTransitionState } from '../../hooks';
import { LayoutStyleProps, withLayoutStyle } from './withLayoutStyle';
import { css } from '../../styles';
import { VariantProps } from '@stitches/core';

type Side = 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom';
type DrawerMode = 'modal' | 'coplanar';

interface DrawerProps {
  mode?: DrawerMode;
  open?: boolean;
  side: Side;
  size?: string | number;
  minSize?: string | number;
  lift?: boolean;
  onClose?: () => void;
}

export const drawerCoplanarCss = css({
  backgroundColor: '$surface',
  boxShadow: '0 0 4px 0 $colors$shadow',
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: '$drawer',

  variants: {
    side: {
      start: {
        left: 'auto',
      },
      end: {
        right: 'auto',
      },
      left: {
        left: 'auto',
      },
      right: {
        right: 'auto',
      },
      top: {
        top: 'auto',
      },
      bottom: {
        bottom: 'auto',
      },
    },

    lift: {
      true: {
        zIndex: '$drawer2',
      },
    },
  },
});

export const drawerModalCss = css({
  backgroundColor: '$surface',
  boxShadow: '0 0 4px 0 $colors$shadow',
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  transition: 'transform 0.5s ease',

  variants: {
    side: {
      start: {
        right: 'auto',
        transform: 'translateX(-100%)',
        '&.entered,&.entering': {
          transform: 'translateX(0)',
        },
      },
      end: {
        left: 'auto',
        transform: 'translateX(100%)',
        '&.entered,&.entering': {
          transform: 'translateX(0)',
        },
      },
      left: {
        right: 'auto',
        transform: 'translateX(-100%)',
        '&.entered,&.entering': {
          transform: 'translateX(0)',
        },
      },
      right: {
        left: 'auto',
        transform: 'translateX(100%)',
        '&.entered,&.entering': {
          transform: 'translateX(0)',
        },
      },
      top: {
        bottom: 'auto',
        transform: 'translateY(-100%)',
        '&.entered,&.entering': {
          transform: 'translateY(0)',
        },
      },
      bottom: {
        top: 'auto',
        transform: 'translateY(100%)',
        '&.entered,&.entering': {
          transform: 'translateY(0)',
        },
      },
    },
  },
});

export const drawerContainerCss = css({
  display: 'flex',
  transition: 'width 0.3s ease, height 0.3s ease',
  position: 'relative',
});

export const drawerModalContainerCss = css({
  backgroundColor: 'transparent',
  display: 'flex',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: '$modal',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s linear',
  '&.entered,&.entering': {
    backgroundColor: '$backdrop',
  },
});

export const drawerHeaderCss = css({
  alignItems: 'center',
  alignSelf: 'stretch',
  boxShadow: '0 0 2px 0 $colors$shadow',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '8px 1rem',
  margin: 0,
  height: '2rem',
  // borderBottom: '1px solid $colors$secondaryDivider',
});

export const drawerContentCss = css({
  alignItems: 'start',
  alignSelf: 'stretch',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'start',
  padding: '8px 1rem',
  margin: 0,
});

export type DrawerStyleProps = VariantProps<typeof drawerCoplanarCss>;

const DrawerHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [drawerHeaderCss()]: true,
      }}
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
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [drawerContentCss()]: true,
      }}
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
  lift?: boolean;
}

export const DrawerInner: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & DrawerInnerProps
> = props => {
  const [local, rest] = splitProps(props, [
    'mode',
    'side',
    'size',
    'state',
    'parent',
    'lift',
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
        classList={{
          ...local.classList,
          [local.class as string]: !!local.class,
          [local.mode === 'modal'
            ? drawerModalCss({
                side: adjustedSide(local.side, direction() === 'rtl'),
              })
            : drawerCoplanarCss({
                side: adjustedSide(local.side, direction() === 'rtl'),
                lift: local.lift,
              })]: true,
          [local.state]: true,
        }}
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
    'lift',
    'class',
    'classList',
    'children',
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
    <Show when={state() !== 'exited'}>
      <div
        ref={containerElt!}
        classList={{
          [local.mode === 'modal' ? drawerModalContainerCss() : drawerContainerCss()]: true,
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
          lift={local.lift}
          parent={containerElt!}
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
