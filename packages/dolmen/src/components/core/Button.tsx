import { ParentComponent, JSX, splitProps } from 'solid-js';
import { buttonStyle, ButtonStyleProps } from './button.css';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Button: ParentComponent<ButtonProps & ButtonStyleProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'color',
    'round',
    'icon',
    'selected',
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
          color: local.selected ? 'selected' : local.color,
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
