import { ParentComponent, JSX, splitProps } from 'solid-js';
import { asideStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, [
    'class',
    'classList',
    'children',
  ]);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class ?? '']: true,
        [asideStyle]: true,
      }}
    >
      {local.children}
    </aside>
  );
};

export default Aside;
