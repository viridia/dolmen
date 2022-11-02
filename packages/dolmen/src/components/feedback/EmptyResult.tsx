import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, theme } from '../../styles';

const emptyResultCss = css({
  fontFamily: theme.fonts.body,
  fontSize: '1rem',
  fontStyle: 'italic',
  color: theme.colors.textDim,
});

export const EmptyResult: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [emptyResultCss()]: true,
      }}
    >
      {props.children}
    </div>
  );
};
