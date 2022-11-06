import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, StyleProps, styleProps } from '../../styles';

const groupCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
});

export const Label: ParentComponent<
  JSX.LabelHTMLAttributes<HTMLLabelElement> & StyleProps
> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <label
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [groupCss()]: true,
      }}
    />
  );
};
