import { JSX, splitProps, VoidComponent } from 'solid-js';

export const Spacer: VoidComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-spacer': true,
      }}
    />
  );
};
