import { ParentComponent, JSX, splitProps } from 'solid-js';
import { stackStyle, StackStyleProps } from './stack.css';

export const Stack: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & StackStyleProps
> = props => {
  const [local, rest] = splitProps(props, ['gap', 'alignItems', 'class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [stackStyle({
          gap: local.gap,
          alignItems: local.alignItems,
        })]: true,
      }}
    >
      {local.children}
    </div>
  );
};

export default Stack;
