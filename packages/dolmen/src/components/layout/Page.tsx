import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
import { LayoutStyleProps, withLayoutStyle } from './withLayoutStyle';

export const pageCss = css({
  backgroundColor: '$background',
  color: '$text',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: 0,
  fontFamily: '$body',
});

export const Page: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <main
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [pageCss()]: true,
      }}
    >
      {local.children}
    </main>
  );
};
