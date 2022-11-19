import { ParentComponent, JSX, splitProps, children, For } from 'solid-js';

export const AvatarGroup: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);

  const avatars = children(() => local.children);
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-avatar-group': true,
      }}
    >
      <For each={avatars.toArray().reverse()}>{av => <div class="dm-item">{av}</div>}</For>
    </div>
  );
};
