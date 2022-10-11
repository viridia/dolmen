import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { textStyle, TextStyleProps } from './text.css';

interface TextProps {
  as?:
    | 'span'
    | 'p'
    | 'abbr'
    | 'acronym'
    | 'b'
    | 'bdo'
    | 'cite'
    | 'dfn'
    | 'em'
    | 'i'
    | 'kbd'
    | 'label'
    | 'samp'
    | 'strong'
    | 'sub'
    | 'sup'
    | 'time'
    | 'tt'
    | 'var';
}

export const Text: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & TextProps & TextStyleProps
> = props => {
  const [local, rest] = splitProps(props, ['size', 'as', 'class', 'classList', 'children']);

  return (
    <Dynamic
      component={local.as ?? 'span'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [textStyle({
          size: local.size,
        })]: true,
      }}
    >
      {local.children}
    </Dynamic>
  );
};

export default Text;
