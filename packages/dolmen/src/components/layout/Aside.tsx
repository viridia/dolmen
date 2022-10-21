import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, StyleProps, styleProps } from '../../styles';

const asideCss = css({
  backgroundColor: '$surface',
  boxShadow: '0 0 2px 0 $colors$shadow',
  padding: '$lg',
  alignItems: 'center',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: '$sidebar'
});

export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & StyleProps
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
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
