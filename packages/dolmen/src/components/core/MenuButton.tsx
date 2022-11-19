import { ParentComponent, Show, useContext } from 'solid-js';
import { ChevronDown } from '../../icons';
import { Button, ButtonProps } from './Button';
import { MenuContext } from './MenuContext';

export const MenuButton: ParentComponent<ButtonProps & { caret?: boolean }> = props => {
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
      type="button"
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
      <span
        classList={{
          'dm-menu-button-caption': true,
          'dm-icon': Boolean(props.icon),
        }}
      >
        {props.children}
      </span>
      <Show when={!props.icon || props.caret === false}>
        <ChevronDown width={16} />
      </Show>
    </Button>
  );
};
