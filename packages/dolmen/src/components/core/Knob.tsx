import { Component, createMemo, createSignal, For, JSX, Setter, Show, splitProps } from 'solid-js';
import { SizeVariant } from '../../styles';
import {
  knobArcStyle as knobArcStyle,
  knobPotCenterStyle,
  knobPotMarkStyle,
  knobPotRimStyle,
  knobRotatorStyle,
  knobStyle,
  knobTickSmallStyle,
  knobTickStyle,
} from './knob.css';

const travelDegrees = 270;

interface KnobProps extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: SizeVariant;
  arc?: 'in' | 'out' | 'none';
  ticks?: 'in' | 'out' | 'none';
  value: number;
  min?: number;
  max: number;
  step?: number;
  minorTick?: number;
  majorTick?: number;
  // precision?: number;
  onChange: Setter<number>;
  classList?: Record<string, boolean>;
}

export const Knob: Component<KnobProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'value',
    'min',
    'max',
    'step',
    'minorTick',
    'majorTick',
    'arc',
    'onChange',
    'class',
    'classList',
    'children',
  ]);

  const [dragging, setDragging] = createSignal(false);

  // {
  //   size = 48,
  //   value,
  //   min = 0,
  //   max,
  //   step = 1,
  //   // precision,
  //   onChange,
  //   classList,
  // }

  // const range = max - min;

  // function formatValue(): string {
  //   return precision !== undefined ? value().toFixed(precision) : value() + '';
  // }

  function onPointerDown(event: PointerEvent) {
    event.stopPropagation();
    (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function onPointerUp(event: PointerEvent) {
    event.stopPropagation();
    (event.currentTarget as HTMLDivElement).releasePointerCapture(event.pointerId);
    setDragging(false);
  }

  function onMouseMove(event: MouseEvent) {
    const { min = 0, max, step = 1, onChange } = local;
    if (dragging()) {
      event.stopPropagation();
      event.preventDefault();
      onChange(x => Math.min(max, Math.max(min, (x - event.movementY) * step)));
    }
  }

  // function onTextChange(event: Event) {
  //   const value = parseFloat((event.currentTarget as HTMLInputElement).value);
  //   if (isNaN(value)) {
  //     // Signal error?
  //     (event.currentTarget as HTMLInputElement).value = formatValue()
  //   } else {
  //     const clampedValue = Math.min(max, Math.max(min, value));
  //     onChange(clampedValue);
  //     (event.currentTarget as HTMLInputElement).value = formatValue()
  //   }
  // }

  // function onKey(event: KeyboardEvent) {
  //   if (event.key === 'ArrowUp') {
  //     onChange(Math.min(max, Math.max(min, value() + step)));
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else if (event.key === 'ArrowDown') {
  //     onChange(Math.min(max, Math.max(min, value() - step)));
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }

  const tickAngles = createMemo(() => {
    const { min = 0, max, majorTick = 0, minorTick = 0 } = local;
    const majorAngles: string[] = [];
    const minorAngles: string[] = [];
    const range = max - min;
    majorAngles.push('0deg');
    if (majorTick > 0) {
      const majorTickAngle = (majorTick * travelDegrees) / range;
      const minorTickAngle = (minorTick * travelDegrees) / range;
      const arcLength = travelDegrees * 0.5001; // 1/2 + a little bit extra for rounding

      for (let i = 0; i <= arcLength; i += majorTickAngle) {
        majorAngles.push(`${i}deg`);
        majorAngles.push(`-${i}deg`);
        if (minorTickAngle > 0) {
          for (
            let minor = i + minorTickAngle;
            minor < i + majorTickAngle && minor < arcLength;
            minor += minorTickAngle
          ) {
            minorAngles.push(`${minor}deg`);
            minorAngles.push(`-${minor}deg`);
          }
        }
      }
    }

    return [majorAngles, minorAngles];
  });

  const angle = createMemo(() => {
    const { value, min = 0, max } = local;
    const angle = (((value - min) * 2) / (max - min) - 1) * travelDegrees * 0.5;
    return `${angle}deg`;
  });

  return (
    <div {...rest} classList={{ ...props.classList, [knobStyle({})]: true }}>
      <Show when={props.arc !== 'none'}>
        <div class={knobArcStyle({ arc: local.arc })} />
      </Show>
      <For each={tickAngles()[0]}>
        {angle => <div class={knobTickStyle} style={{ '--rotation': angle }} />}
      </For>
      <For each={tickAngles()[1]}>
        {angle => (
          <div
            class={knobTickSmallStyle({})}
            style={{ '--rotation': angle }}
          />
        )}
      </For>
      <div
        class={knobPotRimStyle({
          size: props.size,
        })}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onMouseMove={onMouseMove}
        // style={{
        //   '--size': `${size}px`,
        // }}
      >
        <div class={knobPotCenterStyle} />
        {() => (
          <div class={knobRotatorStyle} style={{ '--rotation': angle() }}>
            <div class={knobPotMarkStyle} />
          </div>
        )}
      </div>
    </div>
  );
};
