import { ParentComponent, JSX, splitProps, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ChevronRight } from '../../icons';
import { css, fontSize, size, theme, Z } from '../../styles';

const navItemCss = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'start',
  margin: 0,
  padding: '0 4px 0 12px',
  fontSize: fontSize.sm,
  outline: 'none',
  height: size.md,
});

const navLinkCss = css(navItemCss, {
  color: theme.colors.text,
  textDecoration: 'none',
  '--icon-color': theme.colors.text,

  '&:hover:not([aria-disabled])': {
    backgroundColor: theme.colors.itemHoverBg,
  },

  '&&.active': {
    backgroundColor: theme.colors.itemSelectedBg,
    color: theme.colors.itemSelectedText,
    '--icon-color': theme.colors.itemSelectedText,
  },

  '&:focus:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: Z.focused,
  },

  '&[aria-disabled]': {
    opacity: 0.6,
  },
});

const navLinkTitleCss = css({
  flex: 1,
});

const arrowCss = css({
  width: 16,
  height: 16,
});

const iconContainerCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  marginRight: '4px',
});

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
        [navLinkCss()]: true,
        active: local.active,
      }}
    >
      <Show when={local.icon}>
        <div class={iconContainerCss()}>{local.icon}</div>
      </Show>
      <span class={navLinkTitleCss()}>{local.children}</span>
      <ChevronRight class={arrowCss()} />
    </Dynamic>
  );
};

const navTitleCss = css(navItemCss, {
  color: theme.colors.textDim,
});

const NavTitle: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [navTitleCss()]: true,
      }}
    />
  );
};

const navCss = css({
  alignItems: 'stretch',
  color: '$text',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
});

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
        [navCss()]: true,
      }}
    />
  );
};

Nav.Link = NavLink;
Nav.Title = NavTitle;
