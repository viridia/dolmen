import { VariantProps } from '@stitches/core';
import { colord } from 'colord';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, fontSizeRem, LayoutProps, SizeVariant, styleProps } from '../../styles';

const badgeSize = (base: SizeVariant) => ({
  height: `${fontSizeRem[base] * 1.1}rem`,
  fontSize: `${fontSizeRem[base] * 0.7}rem`,
  padding: '0 0.7em',
});

const badgeCss = css({
  ...badgeSize('md'),
  alignItems: 'center',
  borderRadius: '0.3em',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  variants: {
    size: {
      xl: badgeSize('xl'),
      lg: badgeSize('lg'),
      md: badgeSize('md'),
      sm: badgeSize('sm'),
      xs: badgeSize('xs'),
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

interface BadgeProps {
  color?: string;
}

export const Badge: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutProps & BadgeProps & VariantProps<typeof badgeCss>
> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
    'color',
    'size',
    'radius',
    'class',
    'classList',
    'children',
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
        ...layoutCss,
        [local.class as string]: !!local.class,
        [badgeCss({
          size: local.size,
          radius: local.radius,
        })]: true,
      }}
    >
      {local.children}
    </div>
  );
};
