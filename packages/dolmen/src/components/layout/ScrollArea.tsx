import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars, styleProps, StyleProps } from '../../styles';

const scrollAreaCss = css(
  {
    alignItems: 'stretch',
    backgroundColor: '$fieldBg',
    borderColor: '$fieldBorderSlight',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    color: '$text',
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
    justifyContent: 'start',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  scrollbars
);

export const ScrollArea: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & StyleProps
> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      role="list"
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [scrollAreaCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};
