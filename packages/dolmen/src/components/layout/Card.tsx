import { ParentComponent, JSX, splitProps } from 'solid-js';
import { cardStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

export const Card: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class]: true,
        [cardStyle]: true,
      }}
    >
      {local.children}
    </section>
  );
};

export default Card;