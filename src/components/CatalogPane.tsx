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
import { IFixtureTreeNode } from './node';

interface ItemProps {
  fixture: IFixtureTreeNode;
  selected: Signal<IFixtureTreeNode | null>;
}

const CatalogItem: VoidComponent<ItemProps> = props => {
  const [selected, setSelected] = props.selected;
  return (
    <li
      classList={{ [catalogEntryStyle]: true }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        if (props.fixture.path) {
          setSelected(props.fixture);
        }
      }}
    >
      <div
        classList={{
          [catalogEntryName]: true,
          [selectableEntryName]: !!props.fixture.path,
          selected: selected() === props.fixture,
        }}
      >
        {props.fixture.name}
      </div>
      <Show when={props.fixture.children} keyed>
        {children => <CatalogGroup fixtures={children} selected={props.selected} />}
      </Show>
    </li>
  );
};

interface GroupProps {
  fixtures: IFixtureTreeNode[];
  selected: Signal<IFixtureTreeNode | null>;
  root?: boolean;
}

const CatalogGroup: VoidComponent<GroupProps> = ({ fixtures, selected, root }) => {
  return (
    <ul class={root ? catalogRootGroup : catalogGroup}>
      <For each={fixtures}>{fix => <CatalogItem fixture={fix} selected={selected} />}</For>
    </ul>
  );
};

interface CatalogProps {
  fixtures: Resource<IFixtureGroup[]>;
  selected: Signal<IFixtureTreeNode | null>;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = ({ fixtures, selected }) => {
  const fixtureTree = createMemo<IFixtureTreeNode[]>(() => {
    const root: IFixtureTreeNode[] = [];
    const toSort: IFixtureTreeNode[][] = [root];
    const list = fixtures();
    if (list) {
      // Build tree nodes by coalescing category names
      for (const fix of list) {
        let parent = root;
        for (const dirName of fix.category) {
          let next = parent.find(f => f.name === dirName);
          if (!next) {
            next = {
              name: dirName,
              children: [],
            };
            parent.push(next);
            toSort.push(next.children);
          }
          parent = next.children;
        }

        parent.push(fix);
      }

      // Sort nodes
      for (const dir of toSort) {
        dir.sort(compareNodes);
      }
    }

    return root;
  });
  return (
    <Aside classList={{ [dark]: true, [catalogPaneStyle]: true }}>
      <CatalogGroup root fixtures={fixtureTree()} selected={selected} />
    </Aside>
  );
};

function compareNodes(left: IFixtureTreeNode, right: IFixtureTreeNode) {
  return left.name.localeCompare(right.name);
}
