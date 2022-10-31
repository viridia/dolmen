import { useCodex } from 'solid-codex-api';
import { createMemo, createSignal } from 'solid-js';
import { CheckBox, Drawer } from '../../components';
import { demoPage } from './demoPage';

export const $category = 'layout/Drawer';
export const $name = 'modal';

function HorizontalModalDrawerDemo(props: { side: 'left' | 'right' | 'start' | 'end' }) {
  const params = useCodex().createParams({
    mode: { type: 'string', enumVals: ['left', 'right', 'start', 'end', 'top', 'bottom'] },
    rtl: { type: 'boolean', caption: 'Right-to-Left' },
  });
  const [open, setOpen] = createSignal(false);
  const dir = createMemo(() => {
    return params.rtl() ? 'rtl' : 'ltr';
  });
  return (
    <div
      class={demoPage()}
      style={{
        display: 'flex',
        'flex-direction': 'row',
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={dir()}
    >
      <Drawer
        side={props.side}
        size="300px"
        open={open()}
        mode="modal"
        onClose={() => setOpen(false)}
      >
        Drawer Panel
      </Drawer>
      <div
        style={{
          flex: 1,
          display: 'flex',
          'align-self': 'center',
          'justify-content': 'center',
        }}
      >
        <CheckBox
          checked={open()}
          onClick={() => {
            setOpen(checked => !checked);
          }}
        >
          Open Drawer
        </CheckBox>
      </div>
    </div>
  );
}

function VerticalModalDrawerDemo(props: { side: 'top' | 'bottom' }) {
  const [open, setOpen] = createSignal(false);
  return (
    <div
      class={demoPage()}
      style={{
        display: 'flex',
        'flex-direction': 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Drawer
        side={props.side}
        size="300px"
        open={open()}
        mode="modal"
        onClose={() => setOpen(false)}
      >
        Drawer Panel
      </Drawer>
      <div
        style={{
          flex: 1,
          display: 'flex',
          'align-self': 'center',
          'justify-content': 'center',
        }}
      >
        <CheckBox
          checked={open()}
          onClick={() => {
            setOpen(checked => !checked);
          }}
        >
          Open Drawer
        </CheckBox>
      </div>
    </div>
  );
}

export default {
  'Horizontal left': () => <HorizontalModalDrawerDemo side="left" />,
  'Horizontal right': () => <HorizontalModalDrawerDemo side="right" />,
  'Horizontal start': () => <HorizontalModalDrawerDemo side="start" />,
  'Horizontal end': () => <HorizontalModalDrawerDemo side="end" />,
  'Vertical top': () => <VerticalModalDrawerDemo side="top" />,
  'Vertical bottom': () => <VerticalModalDrawerDemo side="bottom" />,
};
