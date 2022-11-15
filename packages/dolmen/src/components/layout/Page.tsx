import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, Z } from '../../styles';
import { flexKeys, flexPropsCss } from './flexProps';

const pageHeaderTitleCss = css(flexPropsCss, {
  '@layer ui-base': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: '$title',
    fontWeight: 600,
    justifyContent: 'start',
    padding: 0,
  },
});

const PageHeaderTitle: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof pageHeaderTitleCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <span
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [pageHeaderTitleCss(local)]: true,
      }}
    />
  );
};

const pageHeaderCss = css(flexPropsCss, {
  '@layer ui-base': {
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
  },
});

const PageHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof pageHeaderCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [pageHeaderCss(local)]: true,
      }}
    />
  );
};

const pageContentCss = css(flexPropsCss, {
  '@layer ui-base': {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    flex: 1,
    margin: 0,
    padding: '8px',
  },
});

const PageContent: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof pageContentCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [pageContentCss(local)]: true,
      }}
    />
  );
};

const pageCss = css(flexPropsCss, {
  '@layer ui-base': {
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
  },
});

export const Page: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof pageCss>
> & {
  Header: typeof PageHeader;
  Title: typeof PageHeaderTitle;
  Content: typeof PageContent;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <main
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [pageCss(local)]: true,
      }}
    />
  );
};

Page.Header = PageHeader;
Page.Title = PageHeaderTitle;
Page.Content = PageContent;
