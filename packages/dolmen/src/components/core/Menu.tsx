import { ParentComponent, createSignal } from 'solid-js';
import { MenuDivider, MenuItem, MenuItemCheckBox, MenuItemRadio } from './MenuItem';
import { IMenuContext, MenuContext } from './MenuContext';
import { MenuList } from './MenuList';
import { MenuButton } from './MenuButton';

export interface MenuProps {
  onClose?: () => void;
}

export const Menu: ParentComponent<MenuProps> & {
  Item: typeof MenuItem;
  ItemCheckBox: typeof MenuItemCheckBox;
  ItemRadio: typeof MenuItemRadio;
  Divider: typeof MenuDivider;
  List: typeof MenuList;
  Button: typeof MenuButton;
} = props => {
  const [anchor, setAnchor] = createSignal<HTMLElement | undefined>(undefined);
  const context: IMenuContext = {
    anchor,
    close: () => setAnchor(undefined),
    open: anchor => setAnchor(anchor),
  };
  return <MenuContext.Provider value={context}>{props.children}</MenuContext.Provider>;
};

Menu.Item = MenuItem;
Menu.ItemCheckBox = MenuItemCheckBox;
Menu.ItemRadio = MenuItemRadio;
Menu.Divider = MenuDivider;
Menu.List = MenuList;
Menu.Button = MenuButton;
