import { VariantProps } from '@stitches/core';
import { createSignal, Show } from 'solid-js';
import { JSX, splitProps, VoidComponent } from 'solid-js';
import { css } from '../../styles';

type Direction = 'horizontal' | 'vertical';

const splitPaneCss = css({
  alignItems: 'stretch',
  flex: '1 0 0',
  display: 'flex',
  padding: 0,
  overflow: 'hidden',

  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});

const splitBarCss = css({
  alignSelf: 'stretch',
  backgroundColor: '$splitterFill',
  boxShadow: '0 0 2px 0 $colors$splitterShadow',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '10px',
  minHeight: '10px',
  userSelect: 'none',

  '&.horizontal': {
    cursor: 'col-resize',
    // borderWidth: '0 1px 0 1px',
  },

  '&.vertical': {
    cursor: 'row-resize',
    // borderWidth: '1px 0 1px 0',
  },
});

const splitBarDetailCss = css({
  backgroundColor: '$splitterDetail',
  userSelect: 'none',

  '.horizontal > &': {
    width: '3px',
    height: '64px',
  },

  '.vertical > &': {
    width: '64px',
    height: '3px',
  },
});

const splitSegmentCss = css({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  overflow: 'hidden',
  minWidth: 0,
  minHeight: 0,
  flexBasis: 0,
});

interface SplitPaneProps {
  direction: Direction;
  initialPosition?: number;
  first?: JSX.Element;
  second?: JSX.Element;
}

export const SplitPane: VoidComponent<
  JSX.HTMLAttributes<HTMLDivElement> & SplitPaneProps & VariantProps<typeof splitPaneCss>
> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'direction',
    'first',
    'second',
    'initialPosition',
  ]);
  const [position, setPosition] = createSignal<number>(
    Math.max(0, Math.min(1, props.initialPosition ?? 0.5))
  );
  let splitPaneRef: HTMLDivElement;
  let splitBarRef: HTMLDivElement;
  let dragging = false;
  let dragOrigin = 0;
  let dragBasis = 0;
  let direction = 1;

  function onPointerDown(event: PointerEvent) {
    event.stopPropagation();
    (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
    dragging = true;
    dragOrigin = local.direction === 'horizontal' ? event.pageX : event.pageY;
    dragBasis = position();
    direction = getComputedStyle(splitPaneRef).direction === 'rtl' ? -1 : 1;
  }

  function onPointerUp(event: PointerEvent) {
    event.stopPropagation();
    (event.currentTarget as HTMLDivElement).releasePointerCapture(event.pointerId);
    dragging = false;
    dragBasis = position();
  }

  function onPointerMove(event: PointerEvent) {
    if (dragging) {
      event.stopPropagation();
      event.preventDefault();
      if (local.direction === 'horizontal') {
        const dx = (event.pageX - dragOrigin) * direction;
        const newPosition = Math.max(0, Math.min(1, dragBasis + dx / splitPaneRef.offsetWidth));
        setPosition(newPosition);
      } else {
        const dy = event.pageY - dragOrigin;
        const newPosition = Math.max(0, Math.min(1, dragBasis + dy / splitPaneRef.offsetHeight));
        setPosition(newPosition);
      }
    }
  }

  return (
    <div
      {...rest}
      ref={splitPaneRef!}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [splitPaneCss({ direction: local.direction })]: true,
      }}
    >
      <Show when={local.first}>
        <div
          style={{
            'flex-grow': position(),
          }}
          class={splitSegmentCss()}
        >
          {local.first}
        </div>
      </Show>
      <Show when={local.first && local.second}>
        <div
          ref={splitBarRef!}
          class={`${splitBarCss()} ${local.direction}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
        >
          <div class={splitBarDetailCss()} />
        </div>
      </Show>
      <Show when={local.second}>
        <div
          style={{
            'flex-grow': 1 - position(),
          }}
          class={splitSegmentCss()}
        >
          {local.second}
        </div>
      </Show>
    </div>
  );
};
