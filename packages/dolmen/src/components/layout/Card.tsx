import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, styleProps, StyleProps } from '../../styles';

const cardContentCss = css({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  margin: 0,
  padding: '8px',
});

const CardContent: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & StyleProps> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [cardContentCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};

const cardCss = css({
  alignItems: 'stretch',
  backgroundColor: '$elevation1',
  borderRadius: 4,
  boxShadow: '0 1px 2px 0 $colors$shadow',
  color: '$text',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

export const Card: ParentComponent<JSX.HTMLAttributes<HTMLElement> & StyleProps> & {
  Content: typeof CardContent;
} = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [cardCss()]: true,
      }}
    >
      {local.children}
    </section>
  );
};

Card.Content = CardContent;
