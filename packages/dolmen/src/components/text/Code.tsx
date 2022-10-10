import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { codeStyle, CodeStyleProps } from './text.css';

export const Code: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & CodeStyleProps> = props => {
  const [local, rest] = splitProps(props, ['block', 'class', 'classList', 'children']);

  return (
    <code
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [codeStyle({
          block: local.block,
        })]: true,
      }}
    >
      {local.children}
    </code>
  );
};

export default Code;
