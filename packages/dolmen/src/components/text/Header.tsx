import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface HeaderProps {
  as?: 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export const Header: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & HeaderProps> = props => {
  const [local, rest] = splitProps(props, ['as', 'class', 'classList']);

  return (
    <Dynamic
      component={local.as ?? 'header'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-header': true,
      }}
    />
  );
};
