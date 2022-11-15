import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
import { flexKeys, flexPropsCss } from './flexProps';

export const stackCss = css(flexPropsCss, {
  '@layer ui-base': {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
});

export const Stack: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & VariantProps<typeof stackCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [stackCss(local)]: true,
      }}
    />
  );
};
