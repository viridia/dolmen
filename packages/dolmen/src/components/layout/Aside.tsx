import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, space, FlexProps, styleProps, Z } from '../../styles';

export const asideCss = css({
  backgroundColor: '$elevation1',
  boxShadow: '0 0 2px 0 $colors$shadow',
  padding: space.lg,
  alignItems: 'center',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: Z.sidebar,
});

export const Aside: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [asideCss()]: true,
      }}
    />
  );
};
