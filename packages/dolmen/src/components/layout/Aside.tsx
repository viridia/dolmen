import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, space, Z } from '../../styles';
import { flexKeys, flexPropsCss } from './flexProps';

export const asideCss = css(flexPropsCss, {
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
  JSX.HTMLAttributes<HTMLElement> & VariantProps<typeof asideCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [asideCss(local)]: true,
      }}
    />
  );
};
