import { ParentComponent, JSX, splitProps } from 'solid-js';
import { asideStyle, AsideStyleProps } from './aside.css';

export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & AsideStyleProps
> = props => {
  const [local, rest] = splitProps(props, ['gap', 'class', 'classList', 'children']);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [asideStyle({
          gap: local.gap,
        })]: true,
      }}
    >
      {local.children}
    </aside>
  );
};

export default Aside;
