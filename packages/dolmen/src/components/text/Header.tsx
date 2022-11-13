import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { css } from '../../styles';

export const headerCss = css({
  '@layer ui-base': {
    fontFamily: '$title',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: 0,
    marginBottom: '0.3em',
  },
});

interface TitleProps {
  as?: 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export const Title: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & TitleProps> = props => {
  const [local, rest] = splitProps(props, ['as', 'class', 'classList']);

  return (
    <Dynamic
      component={local.as ?? 'header'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [headerCss()]: true,
      }}
    />
  );
};

export const Header = Title;
