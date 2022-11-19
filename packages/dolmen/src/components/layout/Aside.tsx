import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, flexKeys, flexProps, FlexProps, space, Z } from '../../styles';

export const asideCss = css({
  '@layer ui-base': {
    backgroundColor: '$elevation1',
    boxShadow: '0 0 2px 0 $colors$shadow',
    padding: space.lg,
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: Z.sidebar,
  },
});

export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        [asideCss(local)]: true,
      }}
    />
  );
};
