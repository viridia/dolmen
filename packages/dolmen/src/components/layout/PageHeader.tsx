import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageHeaderStyle, layoutStyle, LayoutStyleProps } from './layout.css';

export const PageHeader: ParentComponent<
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
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [pageHeaderStyle]: true,
        [layoutStyle({
          gap: local.gap,
          alignItems: local.alignItems,
          flexDirection: local.flexDirection,
          justifyContent: local.justifyContent,
        })]: Boolean(local.gap || local.alignItems || local.flexDirection || local.justifyContent),
      }}
    >
      {local.children}
    </header>
  );
};

export default PageHeader;
