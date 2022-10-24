import { ParentComponent, useContext } from 'solid-js';
import { ChevronDown } from '../../icons';
import { Spacer } from '../layout';
import { Button, ButtonProps } from './Button';
import { MenuContext } from './MenuContext';

interface MenuButtonProps {}

export const MenuButton: ParentComponent<ButtonProps & MenuButtonProps> = props => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('MenuButton must be inside of a Menu');
  }

  return (
    <Button
      {...props}
      aria-controls={context.anchor() ? 'basic-menu' : undefined}
      aria-haspopup
      aria-expanded={context.anchor() ? 'true' : undefined}
      onClick={e => {
        context.open(e.currentTarget);
      }}
      onKeyDown={e => {
        switch (e.key) {
          case 'Down':
          case 'ArrowDown': {
            e.preventDefault();
            e.stopPropagation();
            context.open(e.currentTarget);
            break;
          }
          case 'Up':
          case 'ArrowUp': {
            e.preventDefault();
            e.stopPropagation();
            context.pendingAction = 'end';
            context.open(e.currentTarget);
            break;
          }
        }
      }}
    >
      {props.children}
      <Spacer />
      <ChevronDown />
    </Button>
  );
};
