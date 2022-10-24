import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars, styleProps, StyleProps } from '../../styles';

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

  variants: {
    selected: {
      true: {
        backgroundColor: '$itemSelectedBg',
        color: '$listSelectectedText',
        '&:hover': {
          backgroundColor: '$itemSelectedBg',
        },
      },
    },
  },
});

const ListItem: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & StyleProps & VariantProps<typeof listItemCss>
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['selected', 'class', 'classList', 'children']);

  return (
    <div
      {...rest}
      role="listitem"
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [listItemCss({
          selected: local.selected,
        })]: true,
      }}
    >
      {local.children}
    </div>
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

export const List: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & StyleProps> & {
  Item: typeof ListItem;
} = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      role="list"
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [listCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};

List.Item = ListItem;
