import { Accessor, createContext } from 'solid-js';

export type MenuAction = 'next' | 'prev' | 'home' | 'end' | 'sync' | 'close';
export interface IMenuContext {
  anchor: Accessor<HTMLElement | undefined>;
  close: () => void;
  open: (anchor: HTMLElement) => void;
  pendingAction?: MenuAction;
}

export const MenuContext = createContext<IMenuContext>();
export const menuCloseEvent = 'dm-menuclose';
