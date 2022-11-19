import { createEffect, createSignal, JSX, onCleanup, ParentComponent } from 'solid-js';
import { Callout } from './Callout';
import { Placement } from '@floating-ui/dom';

interface Props {
  content: JSX.Element | string;
  placement?: Placement;
  delay?: number;
}

export const Tooltip: ParentComponent<Props> = props => {
  const [ref, setRef] = createSignal<HTMLElement | null>();
  const [over, setOver] = createSignal(false);
  const [shown, setShown] = createSignal(false);

  createEffect(() => {
    const elt = ref();
    if (elt && over()) {
      const timer = setTimeout(() => {
        setShown(true);
      }, props.delay ?? 500);
      onCleanup(() => clearTimeout(timer));
    } else {
      setShown(false);
    }
  });

  return (
    <div
      ref={setRef}
      class="dm-anchor-container"
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => {
        setOver(false);
      }}
    >
      <Callout anchor={shown() ? ref() : null} placement={props.placement ?? 'top'}>
        {props.content}
      </Callout>
      {props.children}
    </div>
  );
};
