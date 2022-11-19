import { ParentComponent, JSX, splitProps } from 'solid-js';

export const EmptyResult: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-empty-result': true,
      }}
    >
      {props.children}
    </div>
  );
};
