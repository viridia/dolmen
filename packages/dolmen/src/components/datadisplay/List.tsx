import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars, styleProps, StyleProps } from '../../styles';

const listCss = css(
  {
    alignItems: 'stretch',
    backgroundColor: '$wellBg',
    borderColor: '$wellBorder',
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

export const List: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & StyleProps
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
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

export const ListItem: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & StyleProps & VariantProps<typeof listItemCss>
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['selected', 'class', 'classList', 'children']);

  return (
    <div
      {...rest}
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
