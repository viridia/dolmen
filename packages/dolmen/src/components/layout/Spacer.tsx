import { JSX, splitProps, VoidComponent } from 'solid-js';
import { spacerStyle } from './layout.css';

export const Spacer: VoidComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [spacerStyle]: true,
      }}
    />
  );
};

export default Spacer;
