import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageHeaderStyle, pageHeaderTitleStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

const PageHeaderTitle: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <span
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class ?? '']: true,
        [pageHeaderTitleStyle]: true,
      }}
    >
      {local.children}
    </span>
  );
};

export const PageHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> & { Title: typeof PageHeaderTitle } = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class ?? '']: true,
        [pageHeaderStyle]: true,
      }}
    >
      {local.children}
    </header>
  );
};

PageHeader.Title = PageHeaderTitle;

export default PageHeader;
