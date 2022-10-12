import { createSignal, onCleanup, onMount } from 'solid-js';

interface IFocusTrapOptions {
  onKeyDown?: (e: KeyboardEvent) => void;
}

interface IFocusTrapResult {
  focusProps: {
    ref(form: HTMLElement | null): void;
    onKeyDown: (e: KeyboardEvent) => void;
  };
  focusNext: () => void;
  focusPrev: () => void;
  setFocus: (index: number) => void;
}

const getAllFocusableElements = (parent: HTMLElement): HTMLElement[] => {
  if (!parent) {
    return [];
  }

  return Array.from(
    parent.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
    )
  );
};

const hasParent = (elt: HTMLElement, parent: HTMLElement) => {
  while (elt) {
    if (elt === parent) {
      return true;
    }
    elt = elt.parentElement;
  }
  return false;
};

/** Overrides Tab and Shift-Tab behavior to wrap around when the last/first child is focused. */
export function createFocusTrap(options?: IFocusTrapOptions): IFocusTrapResult {
  const [elt, setElt] = createSignal<HTMLElement | null>(null);
  const [focusableChildren, setFocusableChildren] = createSignal<HTMLElement[]>([]);
  const [saveFocus, setSaveFocus] = createSignal<HTMLElement | null>(null);

  const focusIndex = () => {
    const elements = focusableChildren();
    const active = document.activeElement;
    for (let i = 0, ct = elements.length; i < ct; i++) {
      if (active === elements[i]) {
        return i;
      }
    }
    return -1;
  };

  function setFocus(index: number): void {
    const elements = focusableChildren();
    if (elements.length > index) {
      elements[index].focus();
    }
  }

  function focusNext(): void {
    const elements = focusableChildren();
    if (elements.length > 0) {
      const index = focusIndex();
      setFocus(index < 0 || index >= elements.length - 1 ? 0 : index + 1);
    }
  }

  function focusPrev() {
    const elements = focusableChildren();
    if (elements.length > 0) {
      const index = focusIndex();
      setFocus(index <= 0 ? elements.length - 1 : index - 1);
    }
  }

  onMount(() => {
    const e = elt();

    if (e) {
      let prevFocus = document.activeElement as HTMLElement;

      // Find all focusable children.
      const focusable = getAllFocusableElements(e);
      if (focusable.length === 0) {
        console.warn('Dialog has no focusable children.');
      }
      setFocusableChildren(focusable);

      // Find child with autofocus.
      const autoFocusElt = e.querySelector('[autofocus]') as HTMLElement;
      if (autoFocusElt) {
        autoFocusElt.focus();
      } else if (focusable.length > 0) {
        // Otherwise, focus the first one.
        focusable[0].focus();
      }

      // Only save focus for restoration if focus was outside the container.
      setSaveFocus(hasParent(prevFocus, e) ? null : prevFocus);
    }
  });

  onCleanup(() => {
    if (saveFocus()) {
      saveFocus().focus();
    }
    setFocusableChildren([]);
  });

  return {
    setFocus,
    focusNext,
    focusPrev,
    focusProps: {
      ref: setElt,

      onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Tab') {
          e.preventDefault();
          e.stopPropagation();
          if (e.shiftKey) {
            focusPrev();
          } else {
            focusNext();
          }
        } else if (options.onKeyDown) {
          options.onKeyDown(e);
        }
      },
    },
  };
}
