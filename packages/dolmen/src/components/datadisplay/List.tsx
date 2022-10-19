import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars } from '../../styles';
import { LayoutStyleProps, withLayoutStyle } from '../layout/withLayoutStyle';

export const listCss = css(
  {
    alignItems: 'stretch',
    backgroundColor: '$listBg',
    borderColor: '$listBorder',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    color: '$listText',
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
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
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

export const listItemCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  padding: '4px 8px',

  '&:hover': {
    backgroundColor: '$listHoverBg',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$listSelectedBg',
        color: '$listSelectectedText',
        '&:hover': {
          backgroundColor: '$listSelectedBg',
        },
      },
    },
  },
});

export const ListItem: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps & VariantProps<typeof listItemCss>
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
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
