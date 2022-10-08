import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageHeaderStyle, AppHeaderStyleProps } from './pageheader.css';

export const PageHeader: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & AppHeaderStyleProps
> = props => {
  const [local, rest] = splitProps(props, ['gap', 'class', 'classList', 'children']);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [pageHeaderStyle({
          gap: local.gap,
        })]: true,
      }}
    >
      {local.children}
    </header>
  );
};

export default PageHeader;
