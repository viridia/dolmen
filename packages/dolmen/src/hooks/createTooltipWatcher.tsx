import { Accessor, batch, createEffect, createMemo, createSignal, onCleanup } from 'solid-js';

type TTProviderResult = [
  { onMouseOver(e: MouseEvent): void; onMouseOut(e: MouseEvent): void },
  Accessor<HTMLElement | null>,
  Accessor<string>,
  Accessor<boolean>
];

/** A hook which establishes automatic tooltip support for all descendants of the associated
    DOM element. Any descendant which has the attribute 'data-tooltip=<text>' will show a tooltip
    when hovered. This only supports tooltips that are simple text strings. For tooltips which
    contain rich text or HTML, use the `Tooltip` component.

    Usage:

    ```tsx
      const [tooltipProps, anchor, content, shown] = createTooltipProvider();

      return <div {...tooltipProps}>...</div>
    ```
 */
export function createTooltipWatcher(options: { delay?: number } = {}): TTProviderResult {
  const [hoverElement, setHoverElement] = createSignal<HTMLElement | null>();
  const [tipShown, setTipShown] = createSignal(false);
  const [tipContent, setTipContent] = createSignal('');

  const anchor = createMemo(() => {
    let element = hoverElement();
    for (; element; element = element.parentElement) {
      if (element.dataset.tooltip) {
        return element;
      }
    }
    return null;
  });

  createEffect(() => {
    const elt = anchor();
    if (elt) {
      const timer = setTimeout(() => {
        batch(() => {
          setTipShown(true);
          setTipContent(elt.dataset.tooltip!);
        });
      }, options.delay ?? 500);
      onCleanup(() => clearTimeout(timer));
    } else {
      // Note that tipContent persists while tooltip is exiting...
      setTipShown(false);
    }
  });

  return [
    {
      onMouseOver(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
          setHoverElement(e.target);
        } else {
          setHoverElement(null);
        }
      },
      onMouseOut() {
        setHoverElement(null);
      },
    },
    anchor,
    tipContent,
    tipShown,
  ];
}
