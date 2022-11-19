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
import { SizeVariant } from '../../styles';
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
        'dm-slider': true,
        [`dm-size-${local.size}`]: Boolean(local.size),
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
      <div role="presentation" class="dm-slider-track">
        <div class="dm-slider-bar" style={{ width: `${position() * elementSize().width}px` }} />
        <Show when={marks().length > 0}>
          <div class="dm-slider-marks-container">
            <For each={marks()}>
              {mark => (
                <div
                  classList={{ 'dm-slider-mark': true, 'dm-above': mark.value >= local.value }}
                  style={{ left: `${markPosition(mark.value) * 100}%` }}
                />
              )}
            </For>
          </div>
        </Show>
      </div>
      <div
        ref={setThumbRef}
        class="dm-slider-thumb-container"
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
        <div class="dm-slider-thumb-focus" />
        <div class="dm-slider-thumb" />
        <Show when={local.valueLabelDisplay === 'auto' || local.valueLabelDisplay === 'on'}>
          <div
            ref={setLabelRef}
            classList={{
              'dm-slider-value-label': true,
              'dm-visible': local.valueLabelDisplay === 'on',
            }}
            style={labelStyle()}
          >
            {formattedValue()}
            <div ref={setArrowRef} class="dm-slider-value-label-arrow" style={arrowStyle()} />
          </div>
        </Show>
      </div>
      <input type="hidden" name={props.name} value={props.value} />
    </div>
  );
};
