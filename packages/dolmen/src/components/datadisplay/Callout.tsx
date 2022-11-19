import { ParentComponent, createSignal, createEffect, batch, Show } from 'solid-js';
import { computePosition, flip, offset, arrow, Placement } from '@floating-ui/dom';
import { createCssTransition } from '../../hooks/createCssTransition';

interface CalloutProps {
  anchor?: HTMLElement | null;
  placement?: Placement;
}

export const Callout: ParentComponent<CalloutProps> = props => {
  const [calloutRef, setCalloutRef] = createSignal<HTMLDivElement>();
  const [arrowRef, setArrowRef] = createSignal<HTMLDivElement>();
  const [calloutStyle, setCalloutStyle] = createSignal<{ left?: string; top?: string }>({});
  const [arrowStyle, setArrowStyle] = createSignal<{ left?: string; top?: string }>({});
  const state = createCssTransition({ in: () => !!props.anchor, delay: 100 });

  createEffect(() => {
    const anchorElt = props.anchor;
    const calloutElt = calloutRef();
    const arrowElt = arrowRef();
    if (anchorElt && calloutElt && arrowElt) {
      computePosition(anchorElt, calloutElt, {
        placement: props.placement ?? 'top',
        middleware: [offset(8), flip(), arrow({ element: arrowElt })],
      }).then(({ x, y, placement, middlewareData }) => {
        const { x: ax, y: ay } = middlewareData.arrow as { x: number; y: number };
        batch(() => {
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]];

          setCalloutStyle({
            left: `${x}px`,
            top: `${y}px`,
          });

          setArrowStyle({
            left: ax != null ? `${ax}px` : '',
            top: ay != null ? `${ay}px` : '',
            right: '',
            bottom: '',
            [staticSide!]: '-4px',
          });
        });
      });
    }
  });

  return (
    <Show when={state() !== 'exited'}>
      <div
        ref={setCalloutRef}
        classList={{
          'dm-callout': true,
          [state()]: true,
        }}
        style={calloutStyle()}
      >
        {props.children}
        <div ref={setArrowRef} class="dm-callout-arrow" style={arrowStyle()} />
      </div>
    </Show>
  );
};
