import { createSignal } from 'solid-js';
import { CheckBox, Stack } from '../../components';
import { createCssTransition } from '../../hooks';
import { css } from '../../styles';

export const $category = 'hooks';

export const transitionCss = css({
  backgroundColor: 'gray',
  height: '3rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',

  '&.enter-start': {
    backgroundColor: 'red',
  },

  '&.entering': {
    backgroundColor: 'orange',
  },

  '&.entered': {
    backgroundColor: 'yellow',
  },

  '&.exit-start': {
    backgroundColor: 'lime',
  },

  '&.exiting': {
    backgroundColor: 'green',
  },

  '&.exited': {
    backgroundColor: 'blue',
  },
});

export default () => {
  const [entered, setEntered] = createSignal(false);
  const state = createCssTransition({ in: entered, delay: 500 });

  return (
    <Stack>
      <div
        classList={{
          [transitionCss()]: true,
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
