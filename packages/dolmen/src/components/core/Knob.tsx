import { Component, createMemo, createSignal, For, JSX, Setter, Show, splitProps } from 'solid-js';
import { css, SizeVariant } from '../../styles';
import { VariantProps, CSS } from '@stitches/core';

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

const knobSizes: Record<SizeVariant, number> = {
  xl: 64,
  lg: 48,
  md: 40,
  sm: 32,
  xs: 24,
};

const knobSize: (size: SizeVariant) => CSS = size => ({
  height: `${knobSizes[size]}px`,
  width: `${knobSizes[size]}px`,
});

export const knobCss = css({
  position: 'relative',
  padding: '16px',
  margin: '4px 0',
  userSelect: 'none',
});

export const knobArcCss = css({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  border: '2px solid $colors$knobArc',
  borderRadius: '50%',
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 50%, 0 100%)',

  variants: {
    arc: {
      in: {
        left: '9px',
        top: '9px',
        right: '9px',
        bottom: '9px',
      },

      out: {},

      none: {},
    },
  },
});

export const knobTickCss = css({
  position: 'absolute',
  left: '50%',
  top: 0,
  width: '1px',
  bottom: '50%',
  borderTopColor: '$knobTick',
  borderTopStyle: 'solid',
  borderTopWidth: '10px',
  transform: 'rotate(var(--rotation))',
  transformOrigin: '0 100%',
});

export const knobTickSmallCss = css({
  position: 'absolute',
  left: '50%',
  top: 0,
  width: '1px',
  bottom: '50%',
  borderTopColor: '$knobTick',
  borderTopStyle: 'solid',
  borderTopWidth: '6px',
  transform: 'rotate(var(--rotation))',
  transformOrigin: '0 100%',

  variants: {
    arc: {
      in: {},

      out: {},
      none: {},
    },
  },
});

export const knobPotRimCss = css({
  border: `1px solid $colors$knobRim`,
  borderRadius: '50%',
  background: '$knobRim',
  boxShadow: '0 2px 8px $colors$knobShadow',
  cursor: 'pointer',
  height: '48px',
  position: 'relative',
  width: '48px',

  variants: {
    size: {
      xl: knobSize('xl'),
      lg: knobSize('lg'),
      md: knobSize('md'),
      sm: knobSize('sm'),
      xs: knobSize('xs'),
    },
  },
});

export const knobPotCenterCss = css({
  position: 'absolute',
  left: '1px',
  top: '1px',
  right: '1px',
  bottom: '1px',
  background: '$knobCenter',
  borderRadius: '50%',
});

export const knobRotatorCss = css({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  transform: 'rotate(var(--rotation))',
});

export const knobPotMarkCss = css({
  backgroundColor: '$knobMark',
  borderRadius: '1px',
  width: '3px',
  height: '20%',
  position: 'absolute',
  left: 'calc(50% - 1.5px)',
  top: '2px',
});

// export const knobTitleCss = css({
//   color: 'var(--detail-bright-color)',
//   fontSize: '12px',
// });

// export const knobInputCss = css({
//   backgroundColor: 'rgb(69, 58, 58)',
//   border: '1px solid rgb(37, 31, 31)',
//   borderRadius: '3px',
//   color: 'var(--detail-bright-color)',
//   fontSize: '12px',
//   width: '4rem',
//   padding: '1px 0',
//   textAlign: 'center',
//   outline: 'none',
// });

// .KnobInput:focus {
//   box-shadow: '0 0 0 3px rgb(105, 87, 87)',
// }

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

  function onPointerMove(event: PointerEvent) {
    const { min = 0, max, step = 1, onChange } = local;
    if (dragging()) {
      event.stopPropagation();
      event.preventDefault();
      onChange(x => Math.min(max, Math.max(min, (x - event.movementY) * step)));
    }
  }

  // function formatValue(): string {
  //   return precision !== undefined ? value().toFixed(precision) : value() + '';
  // }

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
    <div {...rest} classList={{ ...props.classList, [knobCss({})]: true }}>
      <Show when={props.arc !== 'none'}>
        <div class={knobArcCss({ arc: local.arc })} />
      </Show>
      <For each={tickAngles()[0]}>
        {angle => <div class={knobTickCss()} style={{ '--rotation': angle }} />}
      </For>
      <For each={tickAngles()[1]}>
        {angle => <div class={knobTickSmallCss({})} style={{ '--rotation': angle }} />}
      </For>
      <div
        class={knobPotRimCss({
          size: props.size,
        })}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <div class={knobPotCenterCss()} />
        {() => (
          <div class={knobRotatorCss()} style={{ '--rotation': angle() }}>
            <div class={knobPotMarkCss()} />
          </div>
        )}
      </div>
    </div>
  );
};
