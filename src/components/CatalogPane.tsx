import { Aside, dark } from 'dolmen';
import { createMemo, For, Resource, Show } from 'solid-js';
import { Signal } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { IFixtureGroup } from '../listFixtures';
import {
  catalogPaneStyle,
  catalogEntryStyle,
  catalogRootGroup,
  catalogGroup,
  catalogEntryName,
  selectableEntryName,
} from './styles.css';
import { IFixtureTree, IFixtureTreeNode } from './node';
import { useNavigate, useParams } from '@solidjs/router';

interface ItemProps {
  fixture: IFixtureTreeNode;
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
        if (props.fixture.path) {
          navigate(`/${props.fixture.urlPath}`);
        }
      }}
    >
      <div
        classList={{
          [catalogEntryName]: true,
          [selectableEntryName]: !!props.fixture.path,
          selected: params.fixture === props.fixture.urlPath,
        }}
      >
        {props.fixture.name}
      </div>
      <Show when={props.fixture.children} keyed>
        {children => <CatalogGroup fixtures={children} />}
      </Show>
    </li>
  );
};

interface GroupProps {
  fixtures: IFixtureTreeNode[];
  root?: boolean;
}

const CatalogGroup: VoidComponent<GroupProps> = ({ fixtures, root }) => {
  return (
    <ul class={root ? catalogRootGroup : catalogGroup}>
      <For each={fixtures}>{fix => <CatalogItem fixture={fix} />}</For>
    </ul>
  );
};

interface CatalogProps {
  fixtures: IFixtureTree;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = (props) => {
  return (
    <Aside classList={{ [dark]: true, [catalogPaneStyle]: true }}>
      <CatalogGroup root fixtures={props.fixtures.children} />
    </Aside>
  );
};
