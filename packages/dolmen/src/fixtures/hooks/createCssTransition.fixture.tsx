import { createSignal } from 'solid-js';
import { CheckBox, Stack } from '../../components';
import { createCssTransition } from '../../hooks';
import { transitionStyle } from './transition.css';

export const $category = 'hooks';

export default () => {
  const [entered, setEntered] = createSignal(false);
  const state = createCssTransition({ in: entered, delay: 500 });

  return (
    <Stack>
      <div
        classList={{
          [transitionStyle]: true,
          [state()]: true,
        }}
      >
        {state()}
      </div>
      <CheckBox checked={entered()} onChange={() => setEntered(prev => !prev)}>
        Enter
      </CheckBox>
    </Stack>
  );
};
