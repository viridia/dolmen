import { ParentComponent, JSX, splitProps } from 'solid-js';
import { cardContentStyle, cardStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

const CardContent: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class]: true,
        [cardContentStyle]: true,
      }}
    >
      {local.children}
    </div>
  );
};

export const Card: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> & { Content: typeof CardContent } = props => {
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

Card.Content = CardContent;

export default Card;
