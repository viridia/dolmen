import { ParentComponent, JSX, splitProps, VoidComponent, Show } from 'solid-js';
import { css, styleProps, StyleProps } from '../../styles';
import { menuCloseEvent } from './MenuContext';

const menuIconCss = css({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  marginRight: '6px',
  height: '20px',
  '--icon-color': '$colors$textDim',

  '.dol-inset > li > * > &': {
    width: '24px',
  },
});

const menuCheckCss = css({
  borderColor: '$text',
  borderWidth: '0 2px 2px 0',
  borderStyle: 'solid',
  content: '',
  height: '12px',
  left: '13px',
  position: 'absolute',
  top: '7px',
  transform: 'rotate(40deg)',
  width: '5px',
});

const menuItemCss = css({
  alignItems: 'center',
  color: '$text',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  padding: '6px 12px 6px 6px',
  margin: '2px',
  outline: 'none',
  position: 'relative',
  textDecoration: 'none',
  cursor: 'pointer', // Only for items that are clickable

  '&[aria-disabled]': {
    opacity: 0.5,
    cursor: 'default',
  },

  '&:hover:not([aria-disabled])': {
    backgroundColor: '$itemHoverBg',
  },

  '&&:focus': {
    backgroundColor: '$itemSelectedBg',
  },
});

interface MenuItemProps {
  disabled?: boolean;
  checked?: boolean;
  onClick?: (e: Event) => void;
  icon?: JSX.Element;
}

const MenuItemBase: ParentComponent<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & MenuItemProps
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
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
          ...layoutStyle,
          [local.class as string]: !!local.class,
          [menuItemCss()]: true,
        }}
        onClick={e => {
          e.stopPropagation();
          if (props.onClick) {
            props.onClick(e);
            // Close menu if they did not call preventDefault().
            if (!e.defaultPrevented) {
              e.preventDefault();
              e.currentTarget.dispatchEvent(new CustomEvent(menuCloseEvent, { bubbles: true }));
            }
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
        <div class={menuIconCss()}>
          <Show when={local.checked} fallback={local.icon}>
            <div class={menuCheckCss()} />
          </Show>
        </div>
        {local.children}
      </a>
    </li>
  );
};

export const MenuItem: ParentComponent<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & MenuItemProps
> = props => {
  return <MenuItemBase role="menuitem" {...props} />;
};

export const MenuItemCheckBox: ParentComponent<
  JSX.HTMLAttributes<HTMLAnchorElement> & StyleProps & MenuItemProps
> = props => {
  return <MenuItemBase role="menuitemcheckbox" aria-checked={props.checked} {...props} />;
};

export const MenuItemRadio: ParentComponent<
  JSX.HTMLAttributes<HTMLAnchorElement> & StyleProps & MenuItemProps
> = props => {
  return <MenuItemBase role="menuitemradio" aria-checked={props.checked} {...props} />;
};

const menuDividerCss = css({
  borderBottom: '1px solid $colors$elevation0',
});

export const MenuDivider: VoidComponent = props => {
  return <div class={menuDividerCss({})} />;
};
