import { VariantProps } from '@stitches/core';
import {
  children,
  createMemo,
  createRenderEffect,
  createSignal,
  Index,
  ParentComponent,
  Show,
} from 'solid-js';
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
  minWidth: '6px',
  minHeight: '6px',
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
    width: '1px',
    height: '64px',
  },

  '.vertical > &': {
    width: '64px',
    height: '1px',
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
}

export const SplitPane: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & SplitPaneProps & VariantProps<typeof splitPaneCss>
> = props => {
  const [positions, setPositions] = createSignal<number[]>([]);

  return <SplitPaneControlled {...props} positions={positions()} setPositions={setPositions} />;
};

interface SplitPaneControlledProps {
  direction: Direction;
  positions: number[];
  setPositions: (p: number[]) => void;
}

export const SplitPaneControlled: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & SplitPaneControlledProps & VariantProps<typeof splitPaneCss>
> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'direction',
    'children',
    'positions',
    'setPositions',
  ]);
  let splitPaneRef: HTMLDivElement;
  let splitBarRef: HTMLDivElement;
  let dragging = false;
  let dragSplitIndex = 0;
  let dragOrigin = 0;
  let dragBasis = 0;
  let direction = 1;

  const childPanes = children(() => props.children);

  function onPointerDown(event: PointerEvent) {
    const elt = event.currentTarget as HTMLDivElement;
    event.stopPropagation();
    elt.setPointerCapture(event.pointerId);
    dragging = true;
    dragSplitIndex = Number(elt.dataset.splitindex);
    dragOrigin = local.direction === 'horizontal' ? event.pageX : event.pageY;
    dragBasis = normalizedPositions()[dragSplitIndex];
    direction = getComputedStyle(splitPaneRef).direction === 'rtl' ? -1 : 1;
  }

  function onPointerUp(event: PointerEvent) {
    event.stopPropagation();
    (event.currentTarget as HTMLDivElement).releasePointerCapture(event.pointerId);
    dragging = false;
  }

  function onPointerMove(event: PointerEvent) {
    if (dragging) {
      event.stopPropagation();
      event.preventDefault();
      const newPositions = [...normalizedPositions()];
      let pos: number;
      let moveAmt: number;
      if (local.direction === 'horizontal') {
        moveAmt = (event.pageX - dragOrigin) * direction;
        pos = Math.max(0, Math.min(1, dragBasis + moveAmt / splitPaneRef.offsetWidth));
        // setPosition(newPosition);
      } else {
        moveAmt = event.pageY - dragOrigin;
        pos = Math.max(0, Math.min(1, dragBasis + moveAmt / splitPaneRef.offsetHeight));
        // setPosition(newPosition);
      }
      newPositions[dragSplitIndex] = pos;

      const numPanes = childPanes.toArray().length;
      const numSplits = Math.max(0, numPanes - 1);
      if (moveAmt > 0) {
        for (let i = dragSplitIndex + 1; i < numSplits; i++) {
          newPositions[i] = Math.max(pos, newPositions[i]);
        }
      } else {
        for (let i = dragSplitIndex - 1; i >= 0; i--) {
          newPositions[i] = Math.min(pos, newPositions[i]);
        }
      }

      // Normalize...
      props.setPositions(newPositions);
    }
  }

  // Normalize the split positions
  const normalizedPositions = createMemo(() => {
    const numPanes = childPanes.toArray().length;
    const numSplits = Math.max(0, numPanes - 1);
    let firstUndefinedIndex = 0;
    let lastDefinedPosition = 0;
    const positions = [...props.positions];
    positions.length = numSplits; // Force length to be numSplits.
    for (let i = 0; i < numSplits; i++) {
      let pos = positions[i];
      if (pos !== undefined) {
        pos = Math.min(lastDefinedPosition, Math.max(pos, 1)); // Clamp to max
        // Fill in any undefined slots between last defined index an current index.
        while (firstUndefinedIndex < i) {
          const widthToDistribute = (pos - lastDefinedPosition) / (i - firstUndefinedIndex + 1);
          lastDefinedPosition += widthToDistribute;
          positions[firstUndefinedIndex++] = lastDefinedPosition;
        }
        firstUndefinedIndex = i + 1;
        lastDefinedPosition = pos;
      }
    }

    while (firstUndefinedIndex < numSplits) {
      const widthToDistribute = (1 - lastDefinedPosition) / (numSplits - firstUndefinedIndex + 1);
      lastDefinedPosition += widthToDistribute;
      positions[firstUndefinedIndex++] = lastDefinedPosition;
    }

    return positions;
  });

  // Convert split positions into an array of flex widths.
  const paneWidths = createMemo<number[]>(() => {
    const numPanes = childPanes.toArray().length;
    if (numPanes == 0) {
      return [];
    }
    const widths: number[] = new Array(numPanes);
    const p = normalizedPositions();
    let prev = 0;
    for (let i = 0; i < numPanes - 1; i++) {
      const pos = p[i];
      widths[i] = Math.max(0, pos - prev);
      prev = pos;
    }
    widths[numPanes - 1] = Math.max(0, 1 - prev);
    return widths;
  });

  // createEffect(() => {
  //   console.log(paneWidths());
  // });

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
      <Index each={childPanes.toArray()}>
        {(pane, index) => {
          return (
            <>
              <Show when={index > 0}>
                <div
                  ref={splitBarRef!}
                  class={`${splitBarCss()} ${local.direction}`}
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerMove={onPointerMove}
                  data-splitindex={index - 1}
                >
                  <div class={splitBarDetailCss()} />
                </div>
              </Show>
              <div
                style={{
                  'flex-grow': paneWidths()[index],
                }}
                class={splitSegmentCss()}
              >
                {pane()}
              </div>
            </>
          );
        }}
      </Index>
    </div>
  );
};
