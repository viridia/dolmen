import { ParentComponent, JSX, splitProps } from 'solid-js';
import { flexKeys, flexProps, FlexProps } from '../../styles';

export const Group: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-group': true,
      }}
    />
  );
};
