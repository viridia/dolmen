import { ParentComponent, JSX, splitProps } from 'solid-js';
import { buttonGroupStyle } from './buttongroup.css';

export const ButtonGroup: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [buttonGroupStyle]: true,
      }}
    >
      {local.children}
    </div>
  );
};

export default ButtonGroup;
