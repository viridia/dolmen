import { createSignal } from 'solid-js';
import { Button, Callout, Group, Stack, Title } from '../../components';

export const $category = 'data display';

function AutoTooltipDemo() {
  const [anchor, setAnchor] = createSignal<HTMLElement | null>(null);
  return (
    <Stack>
      <Group gap="md" p="xl">
        <Callout anchor={anchor()} placement="right">
          <Title>Note</Title>
          This is a callout.
        </Callout>
        <Button ref={setAnchor} data-tooltip="Tooltip One">
          One
        </Button>
      </Group>
    </Stack>
  );
}

export default () => <AutoTooltipDemo />;
