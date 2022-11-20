import { ParentComponent, JSX, splitProps, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ChevronRight } from '../../icons';

interface NavLinkProps {
  as?: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
  href: string;
  active?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
}

const NavLink: ParentComponent<
  NavLinkProps & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'as',
    'active',
    'icon',
    'disabled',
    'children',
  ]);
  return (
    <Dynamic
      component={local.as ?? 'a'}
      {...rest}
      aria-disabled={local.disabled ?? undefined}
      aria-current={local.active ? 'page' : undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-link': true,
        active: local.active,
      }}
    >
      <Show when={local.icon}>
        <div class="dm-nav-icon-container">{local.icon}</div>
      </Show>
      <span class="dm-nav-link-title">{local.children}</span>
      <ChevronRight class="dm-nav-arrow" />
    </Dynamic>
  );
};

const NavTitle: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-title': true,
      }}
    />
  );
};

export const Nav: ParentComponent<JSX.HTMLAttributes<HTMLElement>> & {
  Link: typeof NavLink;
  Title: typeof NavTitle;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <nav
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav': true,
      }}
    />
  );
};

Nav.Link = NavLink;
Nav.Title = NavTitle;
