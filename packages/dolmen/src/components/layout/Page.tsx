import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageStyle, layoutStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

export const Page: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <main
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class]: true,
        [pageStyle]: true,
      }}
    >
      {local.children}
    </main>
  );
};

export default Page;
