import { children, createMemo, createSignal, Index, ParentComponent, Show } from 'solid-js';
import { JSX, splitProps } from 'solid-js';

type Direction = 'horizontal' | 'vertical';

interface SplitPaneProps {
  direction: Direction;
}

export const SplitPane: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & SplitPaneProps> & {
  Controlled: typeof SplitPaneControlled;
} = props => {
  const [positions, setPositions] = createSignal<number[]>([]);

  return <SplitPaneControlled {...props} positions={positions()} setPositions={setPositions} />;
};

interface SplitPaneControlledProps {
  direction: Direction;
  positions: number[];
  setPositions: (p: number[]) => void;
}

export const SplitPaneControlled: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & SplitPaneControlledProps
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
        'dm-split-pane': true,
        [`dm-${local.direction ?? 'horizontal'}`]: true,
      }}
    >
      <Index each={childPanes.toArray()}>
        {(pane, index) => {
          return (
            <>
              <Show when={index > 0}>
                <div
                  ref={splitBarRef!}
                  class="dm-split-bar"
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerMove={onPointerMove}
                  data-splitindex={index - 1}
                >
                  <div class="dm-split-bar-detail" />
                </div>
              </Show>
              <div
                style={{
                  'flex-grow': paneWidths()[index],
                }}
                class="dm-split-segment"
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

SplitPane.Controlled = SplitPaneControlled;
