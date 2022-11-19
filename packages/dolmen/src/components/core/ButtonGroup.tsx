import { ParentComponent, JSX, splitProps } from 'solid-js';

export const ButtonGroup: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-button-group': true,
      }}
    />
  );
};
