import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { titleStyle } from './text.css';

interface TitleProps {
  as?: 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export const Title: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & TitleProps> = props => {
  const [local, rest] = splitProps(props, ['as', 'class', 'classList', 'children']);

  return (
    <Dynamic
      component={local.as ?? 'header'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [titleStyle]: true,
      }}
    >
      {local.children}
    </Dynamic>
  );
};

export default Title;
