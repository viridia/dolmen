import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
import { LayoutStyleProps, withLayoutStyle } from './withLayoutStyle';

export const pageHeaderTitleCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: '$title',
  fontWeight: 600,
  justifyContent: 'start',
  padding: 0,
});

const PageHeaderTitle: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <span
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [pageHeaderTitleCss()]: true,
      }}
    >
      {local.children}
    </span>
  );
};

export const pageHeaderCss = css({
  alignItems: 'center',
  backgroundColor: '$surface',
  boxShadow: '0 0 2px 0 $colors$shadow',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: '$body',
  gap: '$md',
  justifyContent: 'space-between',
  padding: '8px 1rem',
  position: 'relative',
  zIndex: '$appbar',
});

export const PageHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & LayoutStyleProps
> & { Title: typeof PageHeaderTitle } = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [pageHeaderCss()]: true,
      }}
    >
      {local.children}
    </header>
  );
};

PageHeader.Title = PageHeaderTitle;
