import { ParentComponent, JSX, splitProps } from 'solid-js';
import { flexKeys, flexProps, FlexProps } from '../../styles';

export const Aside: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <aside
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-aside': true,
      }}
    />
  );
};
