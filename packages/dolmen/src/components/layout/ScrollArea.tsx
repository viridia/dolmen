import { ParentComponent, JSX, splitProps } from 'solid-js';

interface Props {
  direction?: 'vertical' | 'horizontal' | 'both';
}

export const ScrollArea: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & Props
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'direction']);

  return (
    <div
      {...rest}
      role="list"
      classList={{
        ...local.classList,
        [local.class as string]: Boolean(local.class),
        'dm-scroll-area': true,
        [`dm-${local.direction}`]: Boolean(local.direction),
      }}
    >
      {local.children}
    </div>
  );
};
