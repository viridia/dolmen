import { CheckBox, createCssTransition, Stack } from 'dolmen';
import { createSignal, VoidComponent } from 'solid-js';
import { DemoSection } from '../mdx';

export const TransitionDemo: VoidComponent = () => {
  const [entered, setEntered] = createSignal(false);
  const state = createCssTransition({ in: entered, delay: 500 });

  return (
    <DemoSection>
      <Stack>
        <div>state="{state()}"</div>
        <CheckBox checked={entered()} onChange={() => setEntered(prev => !prev)}>
          In
        </CheckBox>
      </Stack>
    </DemoSection>
  );
};
