import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, styleProps, FlexProps, Z } from '../../styles';

const pageHeaderTitleCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: '$title',
  fontWeight: 600,
  justifyContent: 'start',
  padding: 0,
});

const PageHeaderTitle: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
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

const PageHeader: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
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

const pageContentCss = css({
  alignSelf: 'stretch',
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  flex: 1,
  margin: 0,
  padding: '8px',
});

const PageContent: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [pageContentCss()]: true,
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

export const Page: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> & {
  Header: typeof PageHeader;
  Title: typeof PageHeaderTitle;
  Content: typeof PageContent;
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
Page.Content = PageContent;
