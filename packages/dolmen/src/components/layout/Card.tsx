import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, flexKeys, flexProps, FlexProps } from '../../styles';

const cardContentCss = css({
  '@layer ui-base': {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    margin: 0,
    padding: '12px',
  },
});

const CardContent: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & FlexProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        [cardContentCss(local)]: true,
      }}
    />
  );
};

const cardCss = css({
  '@layer ui-base': {
    alignItems: 'stretch',
    backgroundColor: '$elevation1',
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 $colors$shadow',
    color: '$text',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
});

export const Card: ParentComponent<
  JSX.HTMLAttributes<HTMLElement> & FlexProps
> & {
  Content: typeof CardContent;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        [cardCss(local)]: true,
      }}
    />
  );
};

Card.Content = CardContent;
