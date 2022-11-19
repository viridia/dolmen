import { ParentComponent, JSX, splitProps } from 'solid-js';

export const Label: ParentComponent<JSX.LabelHTMLAttributes<HTMLLabelElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <label
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-label': true,
      }}
    />
  );
};
