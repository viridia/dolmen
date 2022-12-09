import { ParentComponent, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface LinkProps {
  as?: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
  href: string;
  disabled?: boolean;
}

export const Link: ParentComponent<
  LinkProps & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'as',
    'disabled',
    'children',
  ]);
  return (
    <Dynamic
      component={local.as ?? 'a'}
      {...rest}
      aria-disabled={local.disabled ?? undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-link': true,
      }}
    >
      {local.children}
    </Dynamic>
  );
};
