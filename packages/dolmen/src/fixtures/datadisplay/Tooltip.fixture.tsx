import { Button, Callout, Group, Stack, Header, Tooltip } from '../../components';
import { createTooltipWatcher } from '../../hooks';

export const $category = 'data display';

function AutoTooltipDemo() {
  const [props, anchor, content, shown] = createTooltipWatcher();
  return (
    <Stack gap="md">
      <h3>
        Simple Tooltips (<code>data-tooltip={'{text}'}</code>)
      </h3>
      <Group {...props} gap="md">
        <Callout anchor={shown() ? anchor() : null}>{content}</Callout>
        <Button data-tooltip="Tooltip One">One</Button>
        <Button data-tooltip="Tooltip Two">Two</Button>
        <Button data-tooltip="Tooltip Three">Three</Button>
        <Button data-tooltip="Tooltip Four">Four</Button>
      </Group>
      <h3>Rich Tooltips</h3>
      <Tooltip
        placement="top"
        content={
          <Stack>
            <Header>Tip Title</Header>
            <div>Once upon a time, in a land very far away, there lived a young man.</div>
          </Stack>
        }
      >
        <Button>Placement Top</Button>
      </Tooltip>
      <Tooltip
        placement="right"
        content={
          <Stack>
            <Header>Tip Title</Header>
            <div>Once upon a time, in a land very far away, there lived a young man.</div>
          </Stack>
        }
      >
        <Button>Placement Right</Button>
      </Tooltip>
      <Tooltip
        placement="left"
        content={
          <Stack>
            <Header>Tip Title</Header>
            <div>Once upon a time, in a land very far away, there lived a young man.</div>
          </Stack>
        }
      >
        <Button>Placement Left</Button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        content={
          <Stack>
            <Header>Tip Title</Header>
            <div>Once upon a time, in a land very far away, there lived a young man.</div>
          </Stack>
        }
      >
        <Button>Placement Bottom</Button>
      </Tooltip>
    </Stack>
  );
}

export default () => <AutoTooltipDemo />;
