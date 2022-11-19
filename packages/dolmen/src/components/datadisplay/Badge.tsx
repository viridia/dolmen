import { colord } from 'colord';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { SizeVariant } from '../../styles';

interface BadgeProps {
  color?: string;
  size?: SizeVariant;
  radius?: SizeVariant;
}

export const Badge: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & BadgeProps
> = props => {
  const [local, rest] = splitProps(props, [
    'color',
    'size',
    'radius',
    'class',
    'classList',
  ]);
  const c = colord(local.color ?? '#888888');
  const textColor = c.isLight() ? '#000' : '#fff'; // Compute contrasting color.

  return (
    <div
      {...rest}
      style={{
        'background-color': local.color,
        color: textColor,
      }}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-badge': true,
        [`dm-size-${local.size}`]: Boolean(local.size),
        [`dm-radius-${local.radius}`]: Boolean(local.radius),
      }}
    />
  );
};
