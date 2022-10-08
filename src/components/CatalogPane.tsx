import { Aside, dark } from 'dolmen';
import { For, Resource, Show } from 'solid-js';
import { Signal } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { IFixtureGroup } from '../listFixtures';
import {
  catalogPaneStyle,
  catalogEntryStyle,
  catalogRootGroup,
  catalogGroup,
  catalogEntryName,
} from './catalogpane.css';

interface ItemProps {
  fixture: IFixtureGroup;
  selected: Signal<IFixtureGroup | null>;
}

const CatalogItem: VoidComponent<ItemProps> = props => {
  const [selected, setSelected] = props.selected;
  return (
    <li
      classList={{ [catalogEntryStyle]: true }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setSelected(props.fixture);
      }}
    >
      <div classList={{ [catalogEntryName]: true, selected: selected() === props.fixture }}>
        {props.fixture.name}
      </div>
      <Show when={props.fixture.children} keyed>
        {children => <CatalogGroup fixtures={children} selected={props.selected} />}
      </Show>
    </li>
  );
};

interface GroupProps {
  fixtures: IFixtureGroup[];
  selected: Signal<IFixtureGroup | null>;
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
  selected: Signal<IFixtureGroup | null>;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = ({ fixtures, selected }) => {
  return (
    <Aside classList={{ [dark]: true, [catalogPaneStyle]: true }}>
      <CatalogGroup root fixtures={fixtures()} selected={selected} />
    </Aside>
  );
};
