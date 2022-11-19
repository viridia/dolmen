import { ParentComponent, JSX, splitProps } from 'solid-js';
import { ButtonSizeVariant } from '../../styles';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSizeVariant;
  selected?: boolean;
  round?: boolean;
  icon?: boolean;
};

export const Button: ParentComponent<ButtonProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'color',
    'round',
    'icon',
    'selected',
    'class',
    'classList',
  ]);
  return (
    <button
      {...rest}
      aria-selected={local.selected || undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-button': true,
        'dm-round': Boolean(local.round),
        'dm-icon': Boolean(local.icon),
        [`dm-color-${local.color}`]: Boolean(local.color),
        [`dm-size-${local.size}`]: Boolean(local.size),
      }}
    />
  );
};
