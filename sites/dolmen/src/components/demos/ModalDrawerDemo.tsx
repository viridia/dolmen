import { CheckBox, Drawer } from 'dolmen';
import { createSignal, VoidComponent } from 'solid-js';
import { PageOutline } from '../mdx';

export const ModalDrawerDemo: VoidComponent = () => {
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
    </PageOutline>
  );
};
