import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { css } from '../../styles';

const titleCss = css({
  fontFamily: '$title',
  fontWeight: 'bold',
  fontSize: '1rem',
  marginTop: 0,
  marginBottom: '0.3em',

  '&h1': { fontSize: '2rem' },
  '&h2': { fontSize: '1.4rem' },
  '&h3': { fontSize: '1.2rem' },
  '&h4': { fontSize: '1rem' },
  '&h5': { fontSize: '0.9rem' },
});

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
        [local.class as string]: !!local.class,
        [titleCss()]: true,
      }}
    >
      {local.children}
    </Dynamic>
  );
};
