import { Aside, css, dark, scrollbars } from 'dolmen';
import { For, Show } from 'solid-js';
import { VoidComponent } from 'solid-js';
import {
  catalogEntryStyle,
  catalogRootGroup,
  catalogGroup,
  catalogEntryName,
  selectableEntryName,
} from './styles.css';
import { IFixtureTree, IFixtureTreeNode } from './tree';
import { useNavigate, useParams } from '@solidjs/router';

export const catalogPaneCss = css({
  boxShadow: `0 0 3px 0 black`,
  alignItems: 'stretch',
  color: '#fff',
  overflowY: 'auto',
  width: 300,
  zIndex: 800,
}, scrollbars);

interface ItemProps {
  node: IFixtureTreeNode;
}

const CatalogItem: VoidComponent<ItemProps> = props => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <li
      classList={{ [catalogEntryStyle]: true }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        if (props.node.fixture) {
          navigate(`/${props.node.fixture.urlPath}`);
        }
      }}
    >
      <div
        classList={{
          [catalogEntryName]: true,
          [selectableEntryName]: !!props.node.fixture,
          selected: props.node.fixture && params.fixture === props.node.fixture.urlPath,
        }}
      >
        {props.node.title}
      </div>
      <Show when={props.node.children} keyed>
        {children => <CatalogGroup nodes={children} />}
      </Show>
    </li>
  );
};

interface GroupProps {
  nodes: IFixtureTreeNode[];
  root?: boolean;
}

const CatalogGroup: VoidComponent<GroupProps> = ({ nodes, root }) => {
  return (
    <ul class={root ? catalogRootGroup : catalogGroup}>
      <For each={nodes}>{fix => <CatalogItem node={fix} />}</For>
    </ul>
  );
};

interface CatalogProps {
  tree: IFixtureTree;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = (props) => {
  return (
    <Aside classList={{ [dark.className]: true, [catalogPaneCss()]: true }} z="sidebarHigher">
      <CatalogGroup root nodes={props.tree.children ?? []} />
    </Aside>
  );
};
