import { JSX, splitProps, VoidComponent, createMemo, createEffect, createSignal } from 'solid-js';
import { createElementSize } from '../../hooks';
import { css } from '../../styles';

export const sliderCss = css({
  alignItems: 'center',
  cursor: 'pointer',
  minWidth: '100px',
  padding: '6px 0',
  position: 'relative',
  pointerEvents: 'none',
  outline: 'none',
  userSelect: 'none',
});

export const trackCss = css({
  alignSelf: 'stretch',
  backgroundColor: '$sliderTrack',
  borderRadius: '500px',
  height: '8px',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  pointerEvents: 'all',

  ':focus-within:focus-visible > &': {
    boxShadow: '0 0 0 3px $colors$focus',
  },
});

export const barCss = css({
  backgroundColor: '$sliderBar',
  height: '8px',
});

export const thumbContainerCss = css({
  borderRadius: '50%',
  position: 'absolute',
  height: '20px',
  pointerEvents: 'all',
  width: '20px',
  top: 0,
});

export const thumbCss = css({
  backgroundColor: '$sliderThumb',
  borderRadius: '50%',
  boxShadow: '0 1px 4px $colors$shadow',
  position: 'absolute',
  height: '20px',
  pointerEvents: 'all',
  left: 0,
  top: 0,
  width: '20px',
});

export const thumbFocusCss = css({
  backgroundColor: '$focus',
  borderRadius: '50%',
  position: 'absolute',
  content: '',
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

interface SliderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  name?: string;
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
    'onChange',
  ]);
  let dragging = false;
  let dragOffset = 0;
  const [elementSize, sizeRef] = createElementSize();

  /** Returns the current value scaled to the range [0, 1]. */
  const position = createMemo(() => {
    const { min = 0, max = 100, value } = local;
    const range = max - min;
    if (range <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(range, value - min)) / range;
  });

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
        [sliderCss()]: true,
      }}
      onPointerDown={e => {
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging = true;
        dragOffset = 0;
        drag(e.clientX - e.currentTarget.getBoundingClientRect().left);
      }}
      onPointerUp={e => {
        e.stopPropagation();
        e.currentTarget.releasePointerCapture(e.pointerId);
        dragging = false;
      }}
      onPointerMove={e => {
        e.stopPropagation();
        if (dragging) {
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
      <div class={trackCss()}>
        <div class={barCss()} style={{ width: `${position() * elementSize().width}px` }} />
      </div>
      <div
        class={thumbContainerCss()}
        style={{ left: `${position() * (elementSize().width - 16) - 2}px` }}
        onPointerDown={e => {
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging = true;
          dragOffset = position() * elementSize().width - e.offsetX - e.currentTarget.offsetLeft;
          drag(dragOffset + e.offsetX + e.currentTarget.offsetLeft);
        }}
        onPointerUp={e => {
          e.stopPropagation();
          e.currentTarget.releasePointerCapture(e.pointerId);
          dragging = false;
        }}
        onPointerMove={e => {
          e.stopPropagation();
          if (dragging) {
            drag(dragOffset + e.offsetX + e.currentTarget.offsetLeft);
          }
        }}
      >
        <div class={thumbFocusCss()} />
        <div class={thumbCss()} />
      </div>
      <input type="hidden" name={props.name} value={props.value} />
    </div>
  );
};
