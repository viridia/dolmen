import { createSignal, Show } from 'solid-js';
import { JSX, splitProps, VoidComponent } from 'solid-js';
import {
  splitPaneStyle,
  splitSegmentStyle,
  SplitPaneStyleProps,
  splitBarStyle,
  splitBarDetailStyle,
} from './splitpane.css';

type Direction = 'horizontal' | 'vertical';

interface SplitPaneProps {
  direction: Direction;
  initialPosition?: number;
  first?: JSX.Element;
  second?: JSX.Element;
}

export const SplitPane: VoidComponent<
  JSX.HTMLAttributes<HTMLDivElement> & SplitPaneProps & SplitPaneStyleProps
> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'direction',
    'first',
    'second',
    'initialPosition',
  ]);
  const [position, setPosition] = createSignal<number | undefined>(
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
      ref={splitPaneRef}
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [splitPaneStyle({ direction: local.direction })]: true,
      }}
    >
      <Show when={local.first}>
        <div
          style={{
            'flex-grow': position(),
          }}
          class={splitSegmentStyle}
        >
          {local.first}
        </div>
      </Show>
      <Show when={local.first && local.second}>
        <div
          ref={splitBarRef}
          class={`${splitBarStyle} ${local.direction}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
        >
          <div class={splitBarDetailStyle} />
        </div>
      </Show>
      <Show when={local.second}>
        <div
          style={{
            'flex-grow': 1 - position(),
          }}
          class={splitSegmentStyle}
        >
          {local.second}
        </div>
      </Show>
    </div>
  );
};

export default SplitPane;
