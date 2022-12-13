import { CheckBox, Drawer } from 'dolmen';
import { createSignal, VoidComponent } from 'solid-js';
import { PageOutline } from '../mdx';

export const CoplanarDrawerDemo: VoidComponent = () => {
  const [open, setOpen] = createSignal(false);
  return (
    <PageOutline
      style={{
        display: 'flex',
        'flex-direction': 'row',
        position: 'relative',
        overflow: 'hidden',
        height: '20rem'
      }}
    >
      <Drawer
        side="start"
        size="300px"
        open={open()}
        mode="coplanar"
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
    </PageOutline>
  );
};


export const CoplanarDrawerDemoMinSize: VoidComponent = () => {
  const [open, setOpen] = createSignal(false);
  return (
    <PageOutline
      style={{
        display: 'flex',
        'flex-direction': 'row',
        position: 'relative',
        overflow: 'hidden',
        height: '20rem'
      }}
    >
      <Drawer
        side="start"
        size="300px"
        minSize="40px"
        open={open()}
        mode="coplanar"
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
    </PageOutline>
  );
};
