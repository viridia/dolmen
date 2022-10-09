import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageStyle, layoutStyle, LayoutStyleProps } from './layout.css';

export const Page: ParentComponent<
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
    <main
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [pageStyle]: true,
        [layoutStyle({
          gap: local.gap,
          alignItems: local.alignItems,
          flexDirection: local.flexDirection,
          justifyContent: local.justifyContent,
        })]: Boolean(local.gap || local.alignItems || local.flexDirection || local.justifyContent),
      }}
    >
      {local.children}
    </main>
  );
};

export default Page;
