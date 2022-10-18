import { Accessor, createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';

interface ElementSize {
  width: number;
  height: number;
}

/** A hook which attaches to an element and reports the element size to a signal.

    Usage:

    ```ts
      const [size, sizeRef] = createElementSize();

      return <div ref={sizeRef} />
    ```

    `size()` returns the current width and height of the element in pixels.
*/
export const createElementSize = <T extends HTMLElement>(): [
  Accessor<ElementSize>,
  (element: T) => void
] => {
  const [box, setBox] = createSignal<ElementSize>({ width: 0, height: 0 });
  return [
    box,
    (element: T) => {
      if (!isServer) {
        new ResizeObserver(args => {
          const cr = args[0].contentRect;
          setBox({ width: cr.width, height: cr.height });
        }).observe(element);
      }
    },
  ];
};
