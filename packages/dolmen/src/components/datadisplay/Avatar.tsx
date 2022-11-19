import { Colord, colord } from 'colord';
import { ParentComponent, JSX, splitProps, Show } from 'solid-js';
import { SizeVariant } from '../../styles';

export const avatarSizeRem = {
  xl: 2.5,
  lg: 1.5,
  md: 1,
  sm: 0.8,
  xs: 0.6,
};

interface AvatarProps {
  color?: string;
  colorHash?: string;
  title?: string;
  src?: string;
  size?: SizeVariant;
  radius?: SizeVariant;
  crossOrigin?: JSX.HTMLCrossorigin;
}

export const Avatar: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & AvatarProps
> = props => {
  const [local, rest] = splitProps(props, [
    'color',
    'colorHash',
    'size',
    'radius',
    'title',
    'src',
    'crossOrigin',
    'class',
    'classList',
    'children',
  ]);
  const c = local.colorHash ? colorHash(local.colorHash) : colord(local.color ?? '#888888');
  const textColor = c.isLight() ? '#000' : '#fff'; // Compute contrasting color.

  return (
    <div
      {...rest}
      role="img"
      aria-label={local.title}
      style={{
        'background-color': c.toHex(),
        color: textColor,
      }}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-avatar': true,
        [`dm-size-${local.size}`]: Boolean(local.size),
        [`dm-radius-${local.radius}`]: Boolean(local.radius),
      }}
    >
      <Show when={local.src} fallback={local.children}>
        <img class="dm-avatar-img" src={local.src} crossOrigin={local.crossOrigin} />
      </Show>
    </div>
  );
};

function quickHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

function colorHash(str: string): Colord {
  let hash = Math.abs(quickHash(str + 'xyz'));
  const h = hash % 360;
  hash /= 360;
  const s = (hash % 30) + 30;
  hash /= 50;
  const l = (hash % 50) + 25;
  return colord({ h, s, l });
}
