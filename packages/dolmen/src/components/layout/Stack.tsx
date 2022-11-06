import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, StyleProps, styleProps } from '../../styles';

const stackCss = css({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

export const Stack: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & StyleProps> = props => {
  const [styleClass, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...styleClass,
        [local.class as string]: !!local.class,
        [stackCss()]: true,
      }}
    />
  );
};
