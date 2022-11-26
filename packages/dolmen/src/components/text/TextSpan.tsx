import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { TextSizeVariant } from '../../styles';

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
    | 'div'
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
  dim?: boolean;
  em?: boolean;
  strong?: boolean;
  size?: TextSizeVariant;
}

export const TextSpan: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & TextProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'as',
    'dim',
    'em',
    'strong',
    'class',
    'classList',
  ]);

  return (
    <Dynamic
      component={local.as ?? 'span'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-text': true,
        'dm-dim': Boolean(local.dim),
        'dm-em': Boolean(local.em),
        'dm-strong': Boolean(local.strong),
        [`dm-size-${local.size}`]: Boolean(local.size),
      }}
    />
  );
};

export const Text = TextSpan;
