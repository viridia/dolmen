import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, styleProps, StyleProps } from '../../styles';

const cardContentCss = css({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  margin: 0,
  padding: '12px',
});

const CardContent: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & StyleProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [cardContentCss()]: true,
      }}
    />
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
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList']);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [cardCss()]: true,
      }}
    />
  );
};

Card.Content = CardContent;
