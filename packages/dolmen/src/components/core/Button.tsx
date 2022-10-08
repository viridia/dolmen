import { ParentComponent, JSX, splitProps } from 'solid-js';
import { buttonStyle, ButtonStyleProps } from './button.css';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: ParentComponent<ButtonProps & ButtonStyleProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'color',
    'round',
    'icon',
    'class',
    'classList',
    'children',
  ]);
  return (
    <button
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [buttonStyle({
          size: local.size,
          color: local.color,
          round: local.round,
          icon: local.icon,
        })]: true,
      }}
    >
      {local.children}
    </button>
  );
};

export default Button;
