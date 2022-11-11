import {
  JSX,
  splitProps,
  VoidComponent,
  createMemo,
  createEffect,
  createSignal,
  Show,
  batch,
  For,
} from 'solid-js';
import { createElementSize } from '../../hooks';
import { css, fontSize, SizeVariant, Z } from '../../styles';
import { computePosition, flip, offset, arrow } from '@floating-ui/dom';

interface SliderMark {
  value: number;
  label?: JSX.Element;
}

interface SliderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  name?: string;
  size?: SizeVariant;
  marks?: SliderMark[] | true;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  valueLabelFormat?: (value: number) => string;
  onChange?: (value: number) => void;
}

const sliderCss = css({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  height: 'calc(var(--slider-size) * 0.6)',
  minWidth: '100px',
  outline: 'none',
  position: 'relative',
  pointerEvents: 'none',
  userSelect: 'none',
  '--slider-size': '2rem',

  variants: {
    size: {
      xl: {
        '--slider-size': '3rem',
      },
      lg: {
        '--slider-size': '2.5rem',
      },
      md: {
        '--slider-size': '2rem',
      },
      sm: {
        '--slider-size': '1.5rem',
      },
      xs: {
        '--slider-size': '1.3rem',
      },
    },
  },
});

const trackCss = css({
  backgroundColor: '$sliderFill',
  borderRadius: '500px',
  height: 'calc(var(--slider-size) * 0.2)',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  pointerEvents: 'all',

  ':focus-within:focus-visible > &': {
    boxShadow: '0 0 0 3px $colors$focus',
  },
});

const marksContainerCss = css({
  position: 'absolute',
  left: 'calc(var(--slider-size) * 0.25)',
  right: 'calc(var(--slider-size) * 0.25)',
  top: '50%',
  bottom: '50%',
});

const markCss = css({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '50%',
  position: 'absolute',
  top: '50%',
  height: 'calc(var(--slider-size) * 0.13)',
  width: 'calc(var(--slider-size) * 0.13)',
  transform: 'translate(-50%, -50%)',
});

const barCss = css({
  backgroundColor: '$btnPrimary',
  filter: 'saturate(0.7)',
  height: '100%',
});

const thumbContainerCss = css({
  borderRadius: '50%',
  position: 'absolute',
  height: 'calc(var(--slider-size) * 0.6)',
  pointerEvents: 'all',
  width: 'calc(var(--slider-size) * 0.6)',
  top: 0,
});

const thumbCss = css({
  backgroundColor: '$btnPrimary',
  borderRadius: '50%',
  boxShadow: '0 1px 4px $colors$shadow',
  filter: 'brightness(1.1) saturate(0.9)',
  position: 'absolute',
  height: '100%',
  pointerEvents: 'all',
  left: 0,
  top: 0,
  width: '100%',
});

const thumbFocusCss = css({
  backgroundColor: '$focus',
  borderRadius: '50%',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  pointerEvents: 'none',
  transition: 'transform 0.3s ease',
  transform: 'scale(1)',

  ':hover > &': {
    transform: 'scale(1.6)',
  },
});

const valueLabelCss = css({
  backgroundColor: '$tooltipBg',
  color: '$tooltipText',
  borderRadius: '3px',
  minWidth: '12px',
  padding: '2px 4px',
  position: 'absolute',
  pointerEvents: 'none',
  fontSize: fontSize.xxxs,
  opacity: 0,
  textAlign: 'center',
  transition: 'opacity 0.05s linear',
  zIndex: Z.tooltip,

  ':hover > &': {
    opacity: 1,
  },

  variants: {
    on: {
      true: {
        opacity: 1,
      },
    },
  },
});

const valueLabelArrowCss = css({
  backgroundColor: '$tooltipBg',
  width: '8px',
  height: '8px',
  position: 'absolute',
  transform: 'rotate(45deg)',
  zIndex: -1,
});

export const Slider: VoidComponent<SliderProps> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'children',
    'value',
    'min',
    'max',
    'step',
    'precision',
    'size',
    'marks',
    'valueLabelDisplay',
    'valueLabelFormat',
    'onChange',
  ]);
  let dragOffset = 0;
  let dragPointer: number | undefined = undefined;
  const [elementSize, sizeRef] = createElementSize();
  const [thumbRef, setThumbRef] = createSignal<HTMLDivElement>();
  const [labelRef, setLabelRef] = createSignal<HTMLDivElement>();
  const [arrowRef, setArrowRef] = createSignal<HTMLDivElement>();
  const [labelStyle, setLabelStyle] = createSignal<{ left?: string; top?: string }>({});
  const [arrowStyle, setArrowStyle] = createSignal<{ left?: string; top?: string }>({});

  /** Returns the current value scaled to the range [0, 1]. */
  const position = createMemo(() => {
    const { min = 0, max = 100, value } = local;
    const range = max - min;
    if (range <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(range, value - min)) / range;
  });

  const formattedValue = createMemo(() => {
    const { value, precision, valueLabelFormat } = local;
    if (valueLabelFormat) {
      return valueLabelFormat(value);
    }
    if (typeof precision === 'number') {
      return value.toFixed(precision);
    }
    return (Math.round(value * 1000) / 1000).toString();
  });

  const marks = createMemo(() => {
    if (local.marks === true) {
      const { min = 0, max = 100, step = 1 } = local;
      const result: SliderMark[] = [];
      for (let i = min; i <= max; i += step) {
        result.push({ value: i });
      }
      return result;
    } else if (Array.isArray(local.marks)) {
      return local.marks;
    } else {
      return [];
    }
  });

  const markPosition = (value: number) => {
    const { min = 0, max = 100 } = local;
    const range = max - min;
    if (range <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(range, value - min)) / range;
  };

  const setValue = (value: number) => {
    if (local.onChange) {
      const { min = 0, max = 100, step = 0 } = local;
      if (min >= max) {
        return;
      }
      let newValue = Math.max(min, Math.min(max, value));
      if (step > 0) {
        newValue = Math.round(newValue / step) * step;
      }
      local.onChange(newValue);
    }
  };

  const drag = (pos: number) => {
    const { min = 0, max = 100 } = local;
    const range = max - min;
    if (range <= 0) {
      return 0;
    }
    setValue((pos * range) / elementSize().width + min);
  };

  createEffect(() => {
    const thumbElt = thumbRef();
    const labelElt = labelRef();
    const arrowElt = arrowRef();
    if (thumbElt && labelElt && arrowElt && local.value !== undefined) {
      computePosition(thumbElt, labelElt, {
        placement: 'top',
        middleware: [offset(8), flip(), arrow({ element: arrowElt })],
      }).then(({ x, y, placement, middlewareData }) => {
        const { x: arrowX } = middlewareData.arrow as { x: number };
        batch(() => {
          setLabelStyle({
            left: `${x}px`,
            top: `${y}px`,
          });
          if (placement === 'top') {
            setArrowStyle({
              left: arrowX != null ? `${arrowX}px` : '',
              bottom: '-4px',
            });
          } else {
            setArrowStyle({
              left: arrowX != null ? `${arrowX}px` : '',
              top: '-4px',
            });
          }
        });
      });
    }
  });

  return (
    <div
      {...rest}
      ref={sizeRef}
      role="slider"
      aria-valuenow={local.value}
      aria-valuemax={local.max ?? 100}
      aria-valuemin={local.min ?? 0}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [sliderCss({
          size: local.size,
        })]: true,
      }}
      onPointerDown={e => {
        // Don't want to prevent default because we want focus
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        dragOffset = 0;
        dragPointer = e.pointerId;
        drag(e.clientX - e.currentTarget.getBoundingClientRect().left);
      }}
      onPointerUp={e => {
        e.stopPropagation();
        if (dragPointer) {
          e.currentTarget.releasePointerCapture(dragPointer);
          dragPointer = undefined;
        }
      }}
      onPointerMove={e => {
        e.stopPropagation();
        e.preventDefault();
        if (dragPointer !== undefined && e.currentTarget.hasPointerCapture(dragPointer)) {
          drag(e.clientX - e.currentTarget.getBoundingClientRect().left);
        }
      }}
      onKeyDown={e => {
        const { value, step = 0, min = 0, max = 100 } = local;
        const effStep = Math.max(1, step);
        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            e.stopPropagation();
            setValue(value + effStep);
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            e.stopPropagation();
            setValue(value - effStep);
            break;
          case 'Home':
            e.preventDefault();
            e.stopPropagation();
            setValue(min);
            break;
          case 'End':
            e.preventDefault();
            e.stopPropagation();
            setValue(max);
            break;
        }
      }}
      tabIndex={props.tabIndex ?? 0}
    >
      <div role="presentation" class={trackCss()}>
        <div class={barCss()} style={{ width: `${position() * elementSize().width}px` }} />
        <Show when={marks().length > 0}>
          <div class={marksContainerCss()}>
            <For each={marks()}>
              {mark => (
                <div
                  classList={{ [markCss()]: true, 'dm-above': mark.value >= local.value }}
                  style={{ left: `${markPosition(mark.value) * 100}%` }}
                />
              )}
            </For>
          </div>
        </Show>
      </div>
      <div
        ref={setThumbRef}
        class={thumbContainerCss()}
        style={{ left: `calc(${position()} * calc(100% - calc(var(--slider-size) * 0.5)))` }}
        onPointerDown={e => {
          // Don't want to prevent default because we want focus
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          dragPointer = e.pointerId;
          dragOffset = position() * elementSize().width - e.offsetX - e.currentTarget.offsetLeft;
          drag(dragOffset + e.offsetX + e.currentTarget.offsetLeft);
        }}
        onPointerUp={e => {
          e.stopPropagation();
          if (dragPointer) {
            e.currentTarget.releasePointerCapture(dragPointer);
            dragPointer = undefined;
          }
        }}
        onPointerMove={e => {
          e.stopPropagation();
          e.preventDefault();
          if (dragPointer !== undefined && thumbRef()?.hasPointerCapture(dragPointer)) {
            drag(dragOffset + e.offsetX + e.currentTarget.offsetLeft);
          }
        }}
      >
        <div class={thumbFocusCss()} />
        <div class={thumbCss()} />
        <Show when={local.valueLabelDisplay === 'auto' || local.valueLabelDisplay === 'on'}>
          <div
            ref={setLabelRef}
            class={valueLabelCss({
              on: local.valueLabelDisplay === 'on',
            })}
            style={labelStyle()}
          >
            {formattedValue()}
            <div ref={setArrowRef} class={valueLabelArrowCss()} style={arrowStyle()} />
          </div>
        </Show>
      </div>
      <input type="hidden" name={props.name} value={props.value} />
    </div>
  );
};
