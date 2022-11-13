import { ParentComponent, JSX, splitProps, children, For } from 'solid-js';
import { css } from '../../styles';

const avatarGroupCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'start',
  overflowX: 'hidden',
  gap: 4,

  '& > .dm-item': {
    minWidth: 0,
  },

  '& > .dm-item:first-child': {
    minWidth: 'auto',
  },
});

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
        [avatarGroupCss()]: true,
      }}
    >
      <For each={avatars.toArray().reverse()}>{av => <div class="dm-item">{av}</div>}</For>
    </div>
  );
};
