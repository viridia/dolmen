import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
import { LayoutStyleProps, withLayoutStyle } from './withLayoutStyle';

export const asideCss = css({
  backgroundColor: '$surface',
  boxShadow: '0 0 2px 0 $colors$shadow',
  padding: '$lg',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});


export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & LayoutStyleProps
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
        [local.class as string]: !!local.class,
        [asideCss()]: true,
      }}
    >
      {local.children}
    </aside>
  );
};
