import { ParentComponent, JSX, splitProps } from 'solid-js';
import { classes } from '../../styles';
import { groupStyle, LayoutStyleProps } from './layout.css';
import { withLayoutStyle } from './withLayoutStyle';

export const Group: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div {...rest} classList={classes(local.classList, layoutStyle, local.class, groupStyle)}>
      {local.children}
    </div>
  );
};

export default Group;
