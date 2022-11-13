import { JSX, splitProps, VoidComponent } from 'solid-js';
import { css } from '../../styles';

export const spacerCss = css({
  flex: 1,
});

export const Spacer: VoidComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [spacerCss()]: true,
      }}
    />
  );
};
