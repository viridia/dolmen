import { ParentComponent, JSX, splitProps, Show, ParentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ChevronLeft, ChevronRight } from '../../icons';

interface NavLinkProps {
  href: string;
  current?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
}

function NavLink<
  T extends ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>,
  P = T extends ParentComponent<infer Props> ? Props : never
>(props: ParentProps<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & NavLinkProps & P & { as?: T }>) {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'as',
    'current',
    'icon',
    'disabled',
    'children',
  ]);
  return (
    <Dynamic
      component={local.disabled ? 'div' : local.as ?? 'a'}
      {...rest}
      aria-disabled={local.disabled ?? undefined}
      aria-current={local.current ? 'page' : undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-link': true,
      }}
    >
      <Show when={local.icon}>
        <div class="dm-nav-icon-container">{local.icon}</div>
      </Show>
      <span class="dm-nav-link-title">{local.children}</span>
      <ChevronRight class="dm-nav-arrow" />
    </Dynamic>
  );
}

interface NavDirProps {
  href: string;
  disabled?: boolean;
}

function NavNext<
  T extends ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>,
  P = T extends ParentComponent<infer Props> ? Props : never
>(props: ParentProps<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & NavDirProps & P & { as?: T }>) {
  const [local, rest] = splitProps(props, ['class', 'classList', 'as', 'disabled', 'children']);
  return (
    <Dynamic
      component={local.disabled ? 'div' : local.as ?? 'a'}
      {...rest}
      aria-disabled={local.disabled ?? undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-next': true,
      }}
    >
      <span class="dm-nav-link-title">{local.children}</span>
      <ChevronRight class="dm-nav-arrow" />
    </Dynamic>
  );
}

function NavPrev<
  T extends ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>,
  P = T extends ParentComponent<infer Props> ? Props : never
>(props: ParentProps<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & NavDirProps & P & { as?: T }>) {
  const [local, rest] = splitProps(props, ['class', 'classList', 'as', 'disabled', 'children']);
  return (
    <Dynamic
      component={local.disabled ? 'div' : local.as ?? 'a'}
      {...rest}
      aria-disabled={local.disabled ?? undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-prev': true,
      }}
    >
      <ChevronLeft class="dm-nav-arrow" />
      <span class="dm-nav-link-title">{local.children}</span>
    </Dynamic>
  );
}

const NavGroup: ParentComponent<JSX.HTMLAttributes<HTMLElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);
  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-group': true,
      }}
    />
  );
};

const NavSubgroup: ParentComponent<JSX.HTMLAttributes<HTMLElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);
  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav-subgroup': true,
      }}
    />
  );
};

interface NavProps {
  inset?: boolean;
}

export const Nav: ParentComponent<JSX.HTMLAttributes<HTMLElement> & NavProps> & {
  Link: typeof NavLink;
  Group: typeof NavGroup;
  Subgroup: typeof NavSubgroup;
  Prev: typeof NavPrev;
  Next: typeof NavNext;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'inset']);

  return (
    <nav
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-nav': true,
        'dm-nav-inset': local.inset,
      }}
    />
  );
};

Nav.Link = NavLink;
Nav.Group = NavGroup;
Nav.Subgroup = NavSubgroup;
Nav.Prev = NavPrev;
Nav.Next = NavNext;
