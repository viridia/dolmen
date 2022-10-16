import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
import { LayoutStyleProps, withLayoutStyle } from './withLayoutStyle';

export const groupCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
});

export const Group: ParentComponent<
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
        [groupCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};
