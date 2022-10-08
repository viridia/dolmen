import { ParentComponent, JSX, splitProps } from 'solid-js';
import { groupStyle, GroupStyleProps } from './group.css';

export const Group: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & GroupStyleProps
> = props => {
  const [local, rest] = splitProps(props, ['gap', 'alignItems', 'class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [groupStyle({
          gap: local.gap,
          alignItems: local.alignItems,
        })]: true,
      }}
    >
      {local.children}
    </div>
  );
};

export default Group;
