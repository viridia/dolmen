import { ParentComponent, JSX, splitProps } from 'solid-js';
import { groupStyle, layoutStyle, LayoutStyleProps } from './layout.css';

export const Group: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [local, rest] = splitProps(props, [
    'gap',
    'alignItems',
    'justifyContent',
    'flexDirection',
    'class',
    'classList',
    'children',
  ]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [groupStyle]: true,
        [layoutStyle({
          gap: local.gap,
          alignItems: local.alignItems,
          flexDirection: local.flexDirection,
          justifyContent: local.justifyContent,
        })]: Boolean(local.gap || local.alignItems || local.flexDirection || local.justifyContent),
      }}
    >
      {local.children}
    </div>
  );
};

export default Group;
