import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars } from '../../styles';

const listItemCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  padding: '4px 8px',
  cursor: 'pointer', // Only for items that are clickable

  '&:hover': {
    backgroundColor: '$itemHoverBg',
  },

  '&&[aria-disabled]': {
    opacity: 0.5,
    cursor: 'default',
  },

  '&&&[aria-selected]': {
    backgroundColor: '$itemSelectedBg',
    color: '$itemSelectedText',
  },
});

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
        [listItemCss()]: true,
      }}
    />
  );
};

const listCss = css(
  {
    alignItems: 'stretch',
    backgroundColor: '$fieldBg',
    borderColor: '$fieldBorderSlight',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    color: '$text',
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
    justifyContent: 'start',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  scrollbars
);

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
        [listCss()]: true,
      }}
    />
  );
};

List.Item = ListItem;
