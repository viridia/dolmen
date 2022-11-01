import { createMemo, createSignal, For, JSX, Show, splitProps, VoidComponent } from 'solid-js';
import { css, StyleProps, styleProps } from '../../styles';
import { ColorSwatch } from './ColorSwatch';

const colorGridCss = css({
  display: 'grid',
});

interface Props {
  name?: string;
  colors: string[];
  onChange?: (color: string) => void;
  value?: string;
  columns?: number;
  rows?: number;
  columnMajor?: boolean;
}

export const ColorGrid: VoidComponent<
  Props & StyleProps & JSX.HTMLAttributes<HTMLDivElement>
> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
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
        ...layoutCss,
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
    >
      <For each={local.colors}>
        {color => (
          <ColorSwatch
            color={color}
            selected={color === selected()}
            onClick={color => {
              if (props.onChange) {
                props.onChange(color);
              }
              setValue(color);
            }}
          />
        )}
      </For>
      <Show when={props.name}>
        <input type="hidden" name={props.name} value={selected()} />
      </Show>
    </div>
  );
};
