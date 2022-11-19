import { ParentComponent, JSX, splitProps } from 'solid-js';

interface ListItemProps {
  selected?: boolean;
  disabled?: boolean;
}

const ListItem: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & ListItemProps
> = props => {
  const [local, rest] = splitProps(props, [
    'selected',
    'disabled',
    'class',
    'classList',
  ]);

  return (
    <div
      {...rest}
      role="listitem"
      aria-selected={local.selected ? true : undefined}
      aria-disabled={local.disabled ? true : undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-list-item': true,
      }}
    />
  );
};

export const List: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> & {
  Item: typeof ListItem;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      role="list"
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-list': true,
      }}
    />
  );
};

List.Item = ListItem;
