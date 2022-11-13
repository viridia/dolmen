import { ParentComponent, JSX, splitProps, children, For, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ChevronRight } from '../../icons';
import { css } from '../../styles';

const breadcrumbsItemCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontWeight: 'bold',
  color: '$text',
});

export const BreadcrumbsItem: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [breadcrumbsItemCss()]: true,
      }}
    />
  );
};

const linkCss = css(breadcrumbsItemCss, {
  textDecoration: 'none',
  color: '$textLink',
  fontWeight: 'normal',

  '&:hover': {
    textDecoration: 'underline',
  },
});

interface BreadcrumbsLinkProps {
  as?: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
  href: string;
}

export const BreadcrumbsLink: ParentComponent<
  BreadcrumbsLinkProps & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'as']);
  return (
    <Dynamic
      component={local.as ?? 'a'}
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [linkCss()]: true,
      }}
    />
  );
};

interface BreadcrumbsProps {
  separator?: JSX.Element;
}

const breadcrumbsCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
});

const breadcrumbsSeparatorCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  padding: '0, 8px',
  '--icon-color': '$colors$textDim',
});

export const Breadcrumbs: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & BreadcrumbsProps
> & {
  Item: typeof BreadcrumbsItem;
  Link: typeof BreadcrumbsLink;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'separator']);
  const childNodes = children(() => local.children);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [breadcrumbsCss()]: true,
      }}
    >
      <For each={childNodes.toArray()}>
        {(child, index) => (
          <>
            <Show when={index() > 0}>
              <div class={breadcrumbsSeparatorCss()} aria-hidden={true}>
                {local.separator ?? <ChevronRight width="1.5rem" />}
              </div>
            </Show>
            {child}
          </>
        )}
      </For>
    </div>
  );
};

Breadcrumbs.Item = BreadcrumbsItem;
Breadcrumbs.Link = BreadcrumbsLink;
