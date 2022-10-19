import { ParentComponent, JSX, splitProps, children, For, Show } from 'solid-js';
import { ChevronRight } from '../../icons';
import { css } from '../../styles';
import { LayoutStyleProps, withLayoutStyle } from '../layout/withLayoutStyle';

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
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps & BreadcrumbsProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children', 'separator']);
  const childNodes = children(() => local.children);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [breadcrumbsCss()]: true,
      }}
    >
      <For each={childNodes.toArray()}>
        {(child, index) => (
          <>
            <Show when={index() > 0}>
              <div class={breadcrumbsSeparatorCss()}>
                {local.separator ?? <ChevronRight />}
              </div>
              </Show>
            {child}
          </>
        )}
      </For>
    </div>
  );
};

const breadcrumbsItemCss = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  color: '$text',
});

export const BreadcrumbsItem: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & LayoutStyleProps
> = props => {
  const [layoutStyle, nprops] = withLayoutStyle(props);
  const [local, rest] = splitProps(nprops, ['class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [breadcrumbsItemCss()]: true,
      }}
    >
      {local.children}
    </div>
  );
};
