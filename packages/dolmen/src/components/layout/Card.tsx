import { ParentComponent, JSX, splitProps } from 'solid-js';
import { flexKeys, flexProps, FlexProps } from '../../styles';

const CardContent: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & FlexProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-card-content': true,
      }}
    />
  );
};

export const Card: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> & {
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
        'dm-card': true,
      }}
    />
  );
};

Card.Content = CardContent;
