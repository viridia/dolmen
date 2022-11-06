import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, styleProps, StyleProps, Z } from '../../styles';

const pageHeaderTitleCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: '$title',
  fontWeight: 600,
  justifyContent: 'start',
  padding: 0,
});

const PageHeaderTitle: ParentComponent<JSX.HTMLAttributes<HTMLElement> & StyleProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <span
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [pageHeaderTitleCss()]: true,
      }}
    />
  );
};

const pageHeaderCss = css({
  alignItems: 'center',
  backgroundColor: '$elevation1',
  boxShadow: '0 0 2px 0 $colors$shadow',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: '$body',
  gap: '$md',
  justifyContent: 'space-between',
  padding: '8px 1rem',
  position: 'relative',
  zIndex: Z.appbar,
});

const PageHeader: ParentComponent<JSX.HTMLAttributes<HTMLElement> & StyleProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [pageHeaderCss()]: true,
      }}
    />
  );
};

const pageCss = css({
  backgroundColor: '$elevation0',
  color: '$text',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: 0,
  fontFamily: '$body',
});

export const Page: ParentComponent<JSX.HTMLAttributes<HTMLElement> & StyleProps> & {
  Header: typeof PageHeader;
  Title: typeof PageHeaderTitle;
} = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <main
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [pageCss()]: true,
      }}
    />
  );
};

Page.Header = PageHeader;
Page.Title = PageHeaderTitle;
