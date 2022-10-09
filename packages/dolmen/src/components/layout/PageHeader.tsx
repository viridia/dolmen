import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageHeaderStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

export const PageHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class]: true,
        [pageHeaderStyle]: true,
      }}
    >
      {local.children}
    </header>
  );
};

export default PageHeader;
