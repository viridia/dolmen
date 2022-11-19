import { ParentComponent, JSX, splitProps, VoidComponent, Show } from 'solid-js';
import { menuCloseEvent } from './MenuContext';

interface MenuItemProps {
  disabled?: boolean;
  checked?: boolean;
  onClick?: (e: Event) => void;
  icon?: JSX.Element;
}

const MenuItemBase: ParentComponent<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & MenuItemProps
> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'children',
    'checked',
    'disabled',
    'icon',
  ]);

  return (
    <li>
      <a
        {...rest}
        tabIndex={-1}
        aria-disabled={local.disabled}
        classList={{
          ...local.classList,
          [local.class as string]: !!local.class,
          'dm-menu-item': true,
          'dm-icon': Boolean(local.icon && !local.children),
        }}
        onClick={e => {
          e.stopPropagation();
          if (props.onClick) {
            props.onClick(e);
            // Close menu if they did not call preventDefault().
          }
          if (!e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.dispatchEvent(new CustomEvent(menuCloseEvent, { bubbles: true }));
          }
        }}
        onKeyDown={e => {
          switch (e.key) {
            case 'Enter':
            case ' ':
              e.stopPropagation();
              if (props.onClick) {
                props.onClick(e);
                // Close menu if they did not call preventDefault().
                if (!e.defaultPrevented) {
                  e.preventDefault();
                  e.currentTarget.dispatchEvent(new CustomEvent(menuCloseEvent, { bubbles: true }));
                }
              }
              break;
          }
        }}
      >
        <div class="dm-menu-icon">
          <Show when={local.checked} fallback={local.icon}>
            <div class="dm-menu-check" />
          </Show>
        </div>
        <Show when={local.children}>
          <div class="dm-menu-caption">{local.children}</div>
        </Show>
      </a>
    </li>
  );
};

export const MenuItem: ParentComponent<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & MenuItemProps
> = props => {
  return <MenuItemBase role="menuitem" {...props} />;
};

export const MenuItemCheckBox: ParentComponent<
  JSX.HTMLAttributes<HTMLAnchorElement> & MenuItemProps
> = props => {
  return <MenuItemBase role="menuitemcheckbox" aria-checked={props.checked} {...props} />;
};

export const MenuItemRadio: ParentComponent<
  JSX.HTMLAttributes<HTMLAnchorElement> & MenuItemProps
> = props => {
  return <MenuItemBase role="menuitemradio" aria-checked={props.checked} {...props} />;
};

export const MenuDivider: VoidComponent = () => {
  return <div class="dm-menu-divider" />;
};
