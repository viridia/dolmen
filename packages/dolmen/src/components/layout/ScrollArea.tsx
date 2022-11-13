import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars } from '../../styles';

export const scrollAreaCss = css(
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
  JSX.HTMLAttributes<HTMLDivElement> & VariantProps<typeof scrollAreaCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'direction']);

  return (
    <div
      {...rest}
      role="list"
      classList={{
        ...local.classList,
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
