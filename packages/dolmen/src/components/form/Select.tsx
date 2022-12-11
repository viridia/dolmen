import { createMemo, createSignal, For, JSX, Show, splitProps } from 'solid-js';
import { Menu } from '../core/Menu';
import { Text } from '../text/TextSpan';
import { IMenuContext, MenuContext } from '../core/MenuContext';

interface Option<T> {
  value: T;
  label: JSX.Element;
  disabled?: boolean;
}

interface SelectProps<T> {
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
  children?: never;
  name?: string;
  placeholder?: JSX.Element;
}

export function Select<T>(
  props: Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'onSelect'> & SelectProps<T>
) {
  const [local, rest] = splitProps(props, [
    'options',
    'selected',
    'onSelect',
    'name',
    'placeholder',
  ]);
  const [anchor, setAnchor] = createSignal<HTMLElement | undefined>();
  const context: IMenuContext = {
    anchor,
    close: () => setAnchor(undefined),
    open: anchor => setAnchor(anchor),
    // Prefocus the selected item.
  };

  const selectedOption = createMemo(() => {
    return local.options.find(opt => opt.value === local.selected);
  });

  return (
    <MenuContext.Provider value={context}>
      <Menu.Button {...rest} color="default" role="combobox">
        <Show when={selectedOption()} keyed fallback={<Text dim>{local.placeholder ?? ''}</Text>}>
          {selected => selected.label}
        </Show>
      </Menu.Button>
      <Menu.List>
        <For each={local.options}>
          {opt => (
            <Menu.Item
              role="option"
              aria-selected={opt.value === local.selected ? true : undefined}
              disabled={opt.disabled}
              onClick={() => {
                if (!opt.disabled) {
                  local.onSelect(opt.value);
                  setTimeout(() => {
                    setAnchor(undefined);
                  }, 100);
                }
              }}
            >
              {opt.label}
            </Menu.Item>
          )}
        </For>
      </Menu.List>
      <Show when={local.name}>
        <input type="hidden" name={props.name} value={String(local.selected)} />
      </Show>
    </MenuContext.Provider>
  );
}
