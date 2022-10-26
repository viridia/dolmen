import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars, styleProps, StyleProps } from '../../styles';

const scrollAreaCss = css(
  {
    backgroundColor: '$fieldBg',
    borderColor: '$fieldBorderSlight',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    color: '$text',
    padding: '4px',
    overflowY: 'auto',
    overflowX: 'hidden',

    variants: {
      direction: {
        vertical: {
          overflowY: 'auto',
          overflowX: 'hidden',
        },
        horizontal: {
          overflowY: 'hidden',
          overflowX: 'auto',
        },
        both: {
          overflowY: 'auto',
          overflowX: 'auto',
        },
      },
    },
  },
  scrollbars
);

export const ScrollArea: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & StyleProps & VariantProps<typeof scrollAreaCss>
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children', 'direction']);

  return (
    <div
      {...rest}
      role="list"
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [scrollAreaCss({
          direction: local.direction,
        })]: true,
      }}
    >
      {local.children}
    </div>
  );
};
