import { ParentComponent, JSX, splitProps } from 'solid-js';
import { flexKeys, flexProps, FlexProps } from '../../styles';

export const Label: ParentComponent<
  JSX.LabelHTMLAttributes<HTMLLabelElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <label
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-label': true,
      }}
    />
  );
};
