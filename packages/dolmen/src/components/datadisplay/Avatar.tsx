import { VariantProps } from '@stitches/core';
import { Colord, colord } from 'colord';
import { ParentComponent, JSX, splitProps, Show } from 'solid-js';
import { css, SizeVariant } from '../../styles';

export const avatarSizeRem = {
  xl: 2.5,
  lg: 1.5,
  md: 1,
  sm: 0.8,
  xs: 0.6,
};

const avatarSize = (base: SizeVariant) => ({
  height: `${avatarSizeRem[base] * 2}rem`,
  width: `${avatarSizeRem[base] * 2}rem`,
  fontSize: `${avatarSizeRem[base] * 0.85}rem`,
});

const avatarCss = css({
  ...avatarSize('md'),
  alignItems: 'center',
  borderRadius: 48,
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,
  justifyContent: 'center',
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  variants: {
    size: {
      xl: avatarSize('xl'),
      lg: avatarSize('lg'),
      md: avatarSize('md'),
      sm: avatarSize('sm'),
      xs: avatarSize('xs'),
    },

    radius: {
      xl: {
        borderRadius: 32,
      },
      lg: {
        borderRadius: '0.5em',
      },
      md: {
        borderRadius: '0.3em',
      },
      sm: {
        borderRadius: 2,
      },
      xs: {
        borderRadius: 1,
      },
    },
  },
});

const avatarImgCss = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

interface AvatarProps {
  color?: string;
  colorHash?: string;
  title?: string;
  src?: string;
  crossOrigin?: JSX.HTMLCrossorigin;
}

export const Avatar: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & AvatarProps & VariantProps<typeof avatarCss>
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
        [avatarCss({
          size: local.size,
          radius: local.radius,
        })]: true,
      }}
    >
      <Show when={local.src} fallback={local.children}>
        <img class={avatarImgCss()} src={local.src} crossOrigin={local.crossOrigin} />
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
