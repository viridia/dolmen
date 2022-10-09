import { ParentComponent, JSX, splitProps } from 'solid-js';
import { asideStyle, layoutStyle, LayoutStyleProps } from './layout.css';

export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [local, rest] = splitProps(props, [
    'gap',
    'alignItems',
    'justifyContent',
    'flexDirection',
    'class',
    'classList',
    'children',
  ]);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [asideStyle]: true,
        [layoutStyle({
          gap: local.gap,
          alignItems: local.alignItems,
          flexDirection: local.flexDirection,
          justifyContent: local.justifyContent,
        })]: Boolean(local.gap || local.alignItems || local.flexDirection || local.justifyContent),
      }}
    >
      {local.children}
    </aside>
  );
};

export default Aside;
