import { ParentComponent, JSX, splitProps } from 'solid-js';
import { pageStyle, PageStyleProps } from './page.css';

export const Page: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & PageStyleProps> = props => {
  const [local, rest] = splitProps(props, ['flexDirection', 'class', 'classList', 'children']);

  return (
    <main
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [pageStyle({
          flexDirection: local.flexDirection,
        })]: true,
      }}
    >
      {local.children}
    </main>
  );
};

export default Page;
