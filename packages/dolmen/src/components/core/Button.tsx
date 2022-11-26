import { ParentComponent, JSX, splitProps } from 'solid-js';
import { ButtonSizeVariant } from '../../styles';

export interface ButtonProps {
  color?: 'primary' | 'default' | 'danger' | 'subtle' | 'field';
  size?: ButtonSizeVariant;
  selected?: boolean;
  round?: boolean;
  icon?: boolean;
}

export const LinkButton: ParentComponent<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps
> = props => {
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
    <a
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

export const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> & {
  Link: typeof LinkButton;
} = props => {
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

Button.Link = LinkButton;
