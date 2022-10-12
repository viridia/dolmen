import { createSignal } from 'solid-js';
import { Group } from '../../components';
import { DiscloseButton } from '../../components';

export const $category = 'core';

export default () => {
  const [expand, setExpand] = createSignal(false);
  return (
    <Group gap="md">
      <DiscloseButton selected={expand()} onClick={() => setExpand(v => !v)} />
    </Group>
  );
};
