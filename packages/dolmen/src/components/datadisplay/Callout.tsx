import { ParentComponent, createSignal, createEffect, batch, Show } from 'solid-js';
import { css, fontSize, Z } from '../../styles';
import { computePosition, flip, offset, arrow, Placement } from '@floating-ui/dom';
import { createCssTransition } from '../../hooks/createCssTransition';

const calloutCss = css({
  alignItems: 'center',
  backgroundColor: '$tooltipBg',
  borderRadius: '3px',
  color: '$tooltipText',
  flexDirection: 'column',
  fontSize: fontSize.xxxs,
  minWidth: '12px',
  padding: '4px 8px',
  pointerEvents: 'none',
  position: 'absolute',
  justifyContent: 'start',
  maxWidth: '20rem',
  width: 'fit-content(10rem)',
  opacity: 0,
  transition: 'opacity 0.3s linear',
  zIndex: Z.tooltip,

  '&.entering,&.entered': {
    opacity: 1,
  },
});

const calloutArrowCss = css({
  backgroundColor: '$tooltipBg',
  width: '8px',
  height: '8px',
  position: 'absolute',
  transform: 'rotate(45deg)',
  zIndex: -1,
});

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
          [calloutCss()]: true,
          [state()]: true,
        }}
        style={calloutStyle()}
      >
        {props.children}
        <div ref={setArrowRef} class={calloutArrowCss()} style={arrowStyle()} />
      </div>
    </Show>
  );
};
