import { createMemo, createSignal, For, JSX, Show, splitProps, VoidComponent } from 'solid-js';
import { css, Space, Z } from '../../styles';

const colorGridCss = css({
  display: 'grid',
});

const colorGridCellCss = css({
  appearance: 'none',
  outline: 'none',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: 'white',
  cursor: 'pointer',
  minWidth: 16,
  minHeight: 16,
  margin: 0,
  position: 'relative',

  '&:focus:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: Z.focused,
  },

  '&:checked': {
    borderWidth: '1px',
  },

  '&:checked:after': {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    content: '',
    border: '2px solid black',
  },
});

interface Props {
  gap?: Space;
  name?: string;
  colors: string[];
  onChange?: (color: string) => void;
  value?: string;
  columns?: number;
  rows?: number;
  columnMajor?: boolean;
}

export const ColorGrid: VoidComponent<
  Props & JSX.HTMLAttributes<HTMLDivElement>
> = props => {
  const [local, rest] = splitProps(props, [
    'name',
    'colors',
    'rows',
    'columns',
    'columnMajor',
    'onChange',
    'value',
    'class',
    'classList',
  ]);
  const [value, setValue] = createSignal<string>(local.value ?? '');
  const selected = createMemo(() => (props.onChange ? props.value : value()));
  return (
    <div
      {...rest}
      classList={{
        [colorGridCss()]: true,
        [css({
          gridTemplateColumns: `repeat(${local.columns ?? 8}, 1fr)`,
          gridAutoFlow: 'row',
        })()]: !local.columnMajor,
        [css({
          gridTemplateRows: `repeat(${local.rows ?? 8}, 1fr)`,
          gridAutoFlow: 'column',
        })()]: !!local.columnMajor,
      }}
      onKeyDown={e => {
        const advance = (delta: number) => {
          const selectedValue = selected();
          let selectedIndex = selectedValue ? local.colors.indexOf(selectedValue) : -1;
          if (selectedIndex === -1) {
            selectedIndex = 0;
          } else {
            selectedIndex += delta;
            if (selectedIndex < 0) {
              selectedIndex += local.colors.length;
            } else if (selectedIndex >= local.colors.length) {
              selectedIndex -= local.colors.length;
            }
          }

          const newValue = local.colors[selectedIndex];
          if (props.onChange) {
            props.onChange(newValue);
          }
          setValue(newValue);
          const cell = e.currentTarget.children[selectedIndex] as HTMLInputElement;
          if (cell) {
            cell.focus();
          }
        };

        const numRows = local.rows ?? 8;
        const numColumns = local.columns ?? 8;
        switch (e.key) {
          case 'ArrowUp':
          case 'Up':
            if (!local.columnMajor) {
              e.preventDefault();
              e.stopPropagation();
              advance(-numColumns);
            }
            break;
          case 'ArrowDown':
          case 'Down':
            if (!local.columnMajor) {
              e.preventDefault();
              e.stopPropagation();
              advance(numColumns);
            }
            break;
          case 'ArrowLeft':
          case 'Left':
            if (local.columnMajor) {
              e.preventDefault();
              e.stopPropagation();
              advance(-numRows);
            }
            break;
          case 'ArrowRight':
          case 'Right':
            if (local.columnMajor) {
              e.preventDefault();
              e.stopPropagation();
              advance(numRows);
            }
            break;
        }
      }}
    >
      <For each={local.colors}>
        {color => {
          return (
            <input
              type="radio"
              style={{ 'background-color': color }}
              classList={{
                [colorGridCellCss()]: true,
              }}
              color={color}
              name={local.name ?? 'colors'}
              checked={color === selected()}
              value={color}
              onClick={e => {
                if (props.onChange) {
                  props.onChange(e.currentTarget.value);
                }
                setValue(e.currentTarget.value);
              }}
            />
          );
        }}
      </For>
      <Show when={props.name}>
        <input type="hidden" name={props.name} value={selected()} />
      </Show>
    </div>
  );
};
