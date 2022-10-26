import { Aside, css, dark, DiscloseButton, scrollbars } from 'dolmen';
import { For, Show, useContext } from 'solid-js';
import { VoidComponent } from 'solid-js';
import {
  catalogEntryStyle,
  catalogRootGroup,
  catalogGroup,
  catalogEntryName,
  selectableEntryName,
} from './styles.css';
import {
  createExpansionStateStore,
  IFixtureTree,
  IFixtureTreeNode,
  TreeExpansionContext,
} from './tree';
import { useNavigate, useParams } from '@solidjs/router';

export const catalogPaneCss = css(
  {
    boxShadow: '0 0 3px 0 black',
    alignItems: 'stretch !important',
    color: '#fff',
    overflowY: 'auto',
    width: 300,
    zIndex: 800,
  },
  scrollbars
);

export const discloseAreaCss = css({
  width: '1.5rem',
});

interface ItemProps {
  node: IFixtureTreeNode;
}

const CatalogItem: VoidComponent<ItemProps> = props => {
  const params = useParams();
  const navigate = useNavigate();
  const expansion = useContext(TreeExpansionContext);

  const expansionId = `${props.node.category.join('-')}`.toLowerCase().replace(' ', '-');
  const isExpanded = () =>
    Boolean((props.node.children && expansion.isExpanded(expansionId)) ?? true);
  // console.log(expansionId, isExpanded());
  return (
    <li classList={{ [catalogEntryStyle]: true }}>
      <div
        classList={{
          [catalogEntryName]: true,
          [selectableEntryName]: !!props.node.fixture,
          selected: props.node.fixture && params.fixture === props.node.fixture.urlPath,
        }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (props.node.fixture) {
            navigate(`/${props.node.fixture.urlPath}`);
          }
        }}
      >
        <div class={discloseAreaCss()}>
          <Show when={props.node.children} keyed>
            <DiscloseButton
              open={isExpanded()}
              onClick={() => expansion.setExpanded(expansionId, !isExpanded())}
            />
          </Show>
        </div>
        {props.node.title}
      </div>
      <Show when={props.node.children} keyed>
        {children => <CatalogGroup nodes={children} expanded={isExpanded()} />}
      </Show>
    </li>
  );
};

interface GroupProps {
  nodes: IFixtureTreeNode[];
  root?: boolean;
  expanded?: boolean;
}

const CatalogGroup: VoidComponent<GroupProps> = props => {
  return (
    <Show when={props.expanded ?? true}>
      <ul class={props.root ? catalogRootGroup : catalogGroup}>
        <For each={props.nodes}>{fix => <CatalogItem node={fix} />}</For>
      </ul>
    </Show>
  );
};

interface CatalogProps {
  tree: IFixtureTree;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = props => {
  const expansion = createExpansionStateStore('catalog-view');
  return (
    <TreeExpansionContext.Provider value={expansion}>
      <Aside classList={{ [dark.className]: true, [catalogPaneCss()]: true }} zIndex={600}>
        <CatalogGroup root nodes={props.tree.children ?? []} />
      </Aside>
    </TreeExpansionContext.Provider>
  );
};
