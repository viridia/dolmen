import { ParentComponent, JSX, splitProps } from 'solid-js';
import { LayoutStyleProps, withLayoutStyle } from './withLayoutStyle';
import { css } from '../../styles';

const stackCss = css({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

export const Stack: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [stackCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};
