import { Aside, DiscloseButton } from 'dolmen';
import { createSignal, For, onMount, Show, useContext } from 'solid-js';
import { VoidComponent } from 'solid-js';
import {
  catalogEntryStyle,
  catalogGroup,
  catalogEntryName,
  selectableEntryName,
  catalogPaneCss,
  discloseAreaCss,
} from './styles.css';
import {
  createExpansionStateStore,
  IFixtureTree,
  IFixtureTreeNode,
  TreeExpansionContext,
} from './tree';
import { useNavigate, useParams } from '@solidjs/router';

interface ItemProps {
  node: IFixtureTreeNode;
}

const CatalogItem: VoidComponent<ItemProps> = props => {
  const params = useParams();
  const navigate = useNavigate();
  const expansion = useContext(TreeExpansionContext);

  const expansionId = `${props.node.category.join('-')}`.toLowerCase().replace(' ', '-');
  const isExpanded = () =>
    Boolean((props.node.children && expansion.isExpanded(expansionId)) ?? false);
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
        <div classList={{ [discloseAreaCss]: true, 'dm-scrollbars': true }}>
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
    <ul
      classList={{
        [catalogGroup]: true,
        root: props.root,
        expanded: props.expanded,
      }}
    >
      <For each={props.nodes}>{fix => <CatalogItem node={fix} />}</For>
    </ul>
  );
};

interface CatalogProps {
  tree: IFixtureTree;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = props => {
  const expansion = createExpansionStateStore('catalog-view');
  const [mounted, setMounted] = createSignal(false);

  onMount(() => setMounted(true));

  return (
    <Aside classList={{ 'dm-theme-dark': true, [catalogPaneCss]: true }}>
      <Show when={mounted()}>
        <TreeExpansionContext.Provider value={expansion}>
          <CatalogGroup root nodes={props.tree.children ?? []} />
        </TreeExpansionContext.Provider>
      </Show>
    </Aside>
  );
};
