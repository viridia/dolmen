import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css } from '../../styles';
// import styles from '../../styles/css/ButtonGroup.module.scss';

// console.log('styles', buttonGroup);

export const buttonGroupCss = css({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: 3,
});

export const ButtonGroup: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        // [styles.buttonGroup]: true,
        [local.class as string]: !!local.class,
        [buttonGroupCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};
