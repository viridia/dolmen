import { ParentComponent, JSX, splitProps } from 'solid-js';
import { cardContentStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

export const CardContent: ParentComponent<
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

export default CardContent;
