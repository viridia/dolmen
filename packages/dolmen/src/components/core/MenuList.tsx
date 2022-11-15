import {
  ParentComponent,
  JSX,
  splitProps,
  createSignal,
  createEffect,
  Show,
  onMount,
  onCleanup,
  useContext,
} from 'solid-js';
import { css, scrollbars, Z } from '../../styles';
import { autoUpdate, computePosition, flip, offset, Placement } from '@floating-ui/dom';
import { Property } from '@stitches/core/types/css';
import { createCssTransition } from '../../hooks';
import { MenuAction, menuCloseEvent, MenuContext } from './MenuContext';

const menuListCss = css(
  {
    alignItems: 'stretch',
    backgroundColor: '$elevation2',
    boxShadow: '0 1px 4px $colors$shadow',
    borderRadius: '3px',
    color: '$text',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: Z.dropdown,
    margin: 0,
    padding: 0,
    position: 'absolute',
    opacity: 0,
    transform: 'scale(.95)',
    transition: 'transform 0.1s ease, opacity 0.1s linear',

    '&.entering,&.entered': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  scrollbars
);

const menuBackdropCss = css({
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
});

export interface MenuListProps {
  inset?: boolean;
  anchor?: HTMLElement;
  placement?: Placement;
  onClose?: () => void;
}

export const MenuList: ParentComponent<
  JSX.HTMLAttributes<HTMLUListElement> & MenuListProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'inset', 'onClose']);
  const [mounted, setMounted] = createSignal(false);
  const [menuRef, setMenuRef] = createSignal<HTMLElement>();
  const [saveFocus, setSaveFocus] = createSignal<HTMLElement | null>(null);
  const [popupStyle, setPopupStyle] = createSignal<{
    left?: string;
    top?: string;
    position?: Property.Position;
    minWidth?: Property.MinWidth;
  }>({});

  const context = useContext(MenuContext);
  const anchor = () => props.anchor ?? context?.anchor();

  const state = createCssTransition({
    in: () => mounted() && anchor() !== undefined,
    delay: 100,
  });

  onMount(() => {
    // Prevent crash attempting to measure size of hydrating element.
    setMounted(true);
  });

  const menuAction = (action: MenuAction) => {
    if (action === 'close') {
      if (local.onClose) {
        local.onClose();
        saveFocus()?.focus();
      } else if (context) {
        context.close();
        saveFocus()?.focus();
      }
      return;
    }

    const menu = menuRef();
    if (menu) {
      // Find child items that are menu items.
      const items = Array.from(
        menu
          .querySelectorAll(':scope > li > [role^="menuitem"], :scope > li > [role="option"]')
          .values()
      );

      // Get active element in doc, and find menuitem parent
      let activeItem: Element | null | undefined = document.activeElement;
      for (; ; activeItem = activeItem?.parentElement) {
        if (!activeItem) {
          break;
        }
        const role = activeItem.getAttribute('role');
        if (role === 'menu') {
          break;
        } else if (role?.startsWith('menuitem') || role === 'option') {
          break;
        }
      }

      // Adjust index
      let index = activeItem ? items.indexOf(activeItem) : -1;
      switch (action) {
        case 'next':
          index = index >= items.length - 1 ? 0 : index + 1;
          break;
        case 'prev':
          index = index > 0 ? index - 1 : items.length - 1;
          break;
        case 'home':
          index = 0;
          break;
        case 'end':
          index = items.length - 1;
          break;
        case 'sync':
          if (index < 0) {
            index = 0;
          }
          break;
      }

      // Update tabindex and focus
      for (let i = 0, ct = items.length; i < ct; i++) {
        const item = items[i] as HTMLElement;
        if (index === i) {
          item.setAttribute('tabindex', '0');
          if (item !== document.activeElement) {
            item.focus();
          }
        } else {
          item.setAttribute('tabindex', '-1');
        }
      }
    }
  };

  createEffect(() => {
    const anchorElt = anchor();
    const menuElt = menuRef();
    if (anchorElt && menuElt && mounted()) {
      setSaveFocus((document.activeElement as HTMLElement) ?? null);
      if (context) {
        menuAction(context.pendingAction ?? 'home');
        context.pendingAction = undefined;
      } else {
        menuAction('home');
      }
      onCleanup(
        autoUpdate(
          anchorElt,
          menuElt,
          () => {
            computePosition(anchorElt, menuElt, {
              placement: props.placement ?? 'bottom-start',
              middleware: [offset(3), flip()],
            }).then(({ x, y }) => {
              setPopupStyle({
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute',
                'min-width': `${anchorElt.offsetWidth}px`,
              });
            });
          },
          {
            animationFrame: true,
          }
        )
      );
    }
  });

  createEffect(() => {
    const menuElt = menuRef();
    if (menuElt && anchor()) {
      // Listen for close events from menu items.
      const closeListener = () => {
        menuAction('close');
      };

      menuElt.addEventListener(menuCloseEvent, closeListener);
      onCleanup(() => {
        menuElt.removeEventListener(menuCloseEvent, closeListener);
      });
    }
  });

  return (
    <Show when={state() !== 'exited'}>
      <div
        class={menuBackdropCss()}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          menuAction('close');
        }}
      />
      <ul
        {...rest}
        ref={setMenuRef}
        role="menu"
        classList={{
          ...local.classList,
          'dm-inset': local.inset,
          [local.class as string]: !!local.class,
          [state()]: true,
          [menuListCss()]: true,
        }}
        style={popupStyle()}
        onFocusIn={() => {
          menuAction('sync');
        }}
        onKeyDown={e => {
          switch (e.key) {
            case 'Down':
            case 'ArrowDown': {
              e.preventDefault();
              e.stopPropagation();
              menuAction('next');
              break;
            }
            case 'Up':
            case 'ArrowUp': {
              e.preventDefault();
              e.stopPropagation();
              menuAction('prev');
              break;
            }
            case 'PageUp':
            case 'Home': {
              e.preventDefault();
              e.stopPropagation();
              menuAction('home');
              break;
            }
            case 'PageDown':
            case 'End': {
              e.preventDefault();
              e.stopPropagation();
              menuAction('end');
              break;
            }
            case 'Escape': {
              if (local.onClose || context) {
                e.preventDefault();
                e.stopPropagation();
                menuAction('close');
              }
              break;
            }
            // Right: open submenu
            // Left: parent
          }
        }}
      >
        {props.children}
      </ul>
    </Show>
  );
};
