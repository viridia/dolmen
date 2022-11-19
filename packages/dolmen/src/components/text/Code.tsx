import { ParentComponent, JSX, splitProps } from 'solid-js';
import { TextSizeVariant } from '../../styles';

interface CodeProps {
  block?: boolean;
  size?: TextSizeVariant;
}

/** Inline code element. */
export const Code: ParentComponent<JSX.HTMLAttributes<HTMLElement> & CodeProps> = props => {
  const [local, rest] = splitProps(props, ['size', 'class', 'classList']);

  return (
    <code
      {...rest}
      classList={{
        ...local.classList,
        [local as string]: !!local.class,
        'dm-code': true,
        [`dm-size-${local.size}`]: Boolean(local.size),
      }}
    />
  );
};

/** Code block. */
export const CodeBlock: ParentComponent<JSX.HTMLAttributes<HTMLElement> & CodeProps> = props => {
  const [local, rest] = splitProps(props, ['size', 'class', 'classList']);

  // Note: Highlight.js and Prism requires that the <pre> element be a separate, surrounding
  // element.
  return (
    <pre
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-code': true,
        [`dm-size-${local.size}`]: Boolean(local.size),
      }}
    >
      <code {...rest} />
    </pre>
  );
};
