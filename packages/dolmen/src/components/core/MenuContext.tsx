import { Accessor, createContext } from 'solid-js';

export interface IMenuContext {
  anchor: Accessor<HTMLElement | undefined>;
  close: () => void;
  open: (anchor: HTMLElement) => void;
}

export const MenuContext = createContext<IMenuContext>();

export const menuCloseEvent = 'dol-menuclose';
