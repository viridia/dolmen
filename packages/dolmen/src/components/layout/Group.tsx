import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
import { flexKeys, flexPropsCss } from './flexProps';

export const groupCss = css(flexPropsCss, {
  '@layer ui-base': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
});

export const Group: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & VariantProps<typeof groupCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [groupCss(local)]: true,
      }}
    />
  );
};
