import { createMemo, createSignal } from 'solid-js';
import { CheckBox, Drawer, Stack } from '../../components';
import { demoPage } from './demoPage';
import { useCodex } from 'solid-codex-api';

export const $category = 'layout/Drawer';
export const $name = 'coplanar';

function HorizontalCoplanarDrawerDemo(props: { side: 'left' | 'right' | 'start' | 'end' }) {
  const params = useCodex().createParams({
    mode: { type: 'string', enumVals: ['left', 'right', 'start', 'end'] },
    rtl: { type: 'boolean', caption: 'Right-to-Left' },
  });
  const [open, setOpen] = createSignal(false);
  const { side } = props;
  const dir = createMemo(() => {
    return params.rtl() ? 'rtl' : 'ltr';
  });
  const reverse = createMemo(() => {
    let reverse = side === 'right' || side === 'end';
    if (dir() === 'rtl' && (side === 'left' || side === 'right')) {
      reverse = !reverse;
    }
    return reverse;
  });
  return (
    <div
      class={demoPage()}
      style={{
        display: 'flex',
        'flex-direction': reverse() ? 'row-reverse' : 'row',
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={dir()}
    >
      <Drawer side={props.side} size="300px" open={open()} mode="coplanar">
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

function VerticalCoplanarDrawerDemo(props: { side: 'top' | 'bottom' }) {
  const [open, setOpen] = createSignal(false);
  const { side } = props;
  return (
    <div
      class={demoPage()}
      style={{
        display: 'flex',
        'flex-direction': side === 'bottom' ? 'column-reverse' : 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Drawer side={props.side} size="300px" open={open()} mode="coplanar">
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

function MultiDrawerDemo() {
  const [open1, setOpen1] = createSignal(false);
  const [open2, setOpen2] = createSignal(false);
  const [open3, setOpen3] = createSignal(false);
  const [open4, setOpen4] = createSignal(false);
  return (
    <div
      class={demoPage()}
      style={{
        display: 'flex',
        'flex-direction': 'row',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Drawer side="left" size="300px" open={open2()} mode="coplanar">
        Drawer Panel 2
      </Drawer>
      <Drawer side="left" size="300px" open={open1()} mode="coplanar">
        Drawer Panel 1
      </Drawer>
      <div
        style={{
          flex: 1,
          display: 'flex',
          'align-self': 'center',
          'justify-content': 'center',
        }}
      >
        <Stack>
          <CheckBox
            checked={open1()}
            onClick={() => {
              setOpen1(checked => !checked);
            }}
          >
            Open Drawer 1
          </CheckBox>
          <CheckBox
            checked={open2()}
            onClick={() => {
              setOpen2(checked => !checked);
            }}
          >
            Open Drawer 2
          </CheckBox>
          <CheckBox
            checked={open3()}
            onClick={() => {
              setOpen3(checked => !checked);
            }}
          >
            Open Drawer 3
          </CheckBox>
          <CheckBox
            checked={open4()}
            onClick={() => {
              setOpen4(checked => !checked);
            }}
          >
            Open Drawer 4
          </CheckBox>
        </Stack>
      </div>
      <Drawer side="right" size="300px" open={open3()} mode="coplanar">
        Drawer Panel 3
      </Drawer>
      <Drawer side="right" size="300px" open={open4()} mode="coplanar">
        Drawer Panel 4
      </Drawer>
    </div>
  );
}

export default {
  'Horizontal left': () => <HorizontalCoplanarDrawerDemo side="left" />,
  'Horizontal right': () => <HorizontalCoplanarDrawerDemo side="right" />,
  'Horizontal start': () => <HorizontalCoplanarDrawerDemo side="start" />,
  'Horizontal end': () => <HorizontalCoplanarDrawerDemo side="end" />,
  'Vertical top': () => <VerticalCoplanarDrawerDemo side="top" />,
  'Vertical bottom': () => <VerticalCoplanarDrawerDemo side="bottom" />,
  Multiple: () => <MultiDrawerDemo />,
};
