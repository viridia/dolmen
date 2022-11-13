import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';

const groupCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
});

export const Label: ParentComponent<
  JSX.LabelHTMLAttributes<HTMLLabelElement>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <label
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [groupCss()]: true,
      }}
    />
  );
};
