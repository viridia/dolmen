import { Button, Input, Page, Stack } from '../../components';
import { Cancel } from '../../icons';

export const $category = 'form';

export default {
  Variants: () => (
    <Stack gap="md" w="20rem">
      <Input value="default" />
      <Input round value="round" />
      <Input disabled value="disabled" />
      <Input readOnly value="readonly" />
      <Input placeholder="placeholder" />
    </Stack>
  ),
  Sizes: () => (
    <Stack gap="md" w="20rem">
      <Input size="xl" value="X-Large" />
      <Input size="lg" value="Large" />
      <Input size="md" value="Medium" />
      <Input size="sm" value="Small" />
      <Input size="xs" value="X-Small" />
    </Stack>
  ),
  Adornments: () => (
    <Stack gap="md" w="20rem">
      <Input value="Adorn Left" adornLeft={<Cancel />} />
      <Input value="Adorn Right" adornRight={<Cancel />} />
      <Input value="Adorn Left" adornLeft={<Cancel />} round />
      <Input value="Adorn Right" adornRight={<Cancel />} round />
      <Input
        value="Adorn Both"
        adornLeft={
          <>
            <Cancel />
            <Cancel />
          </>
        }
        adornRight={
          <>
            <Cancel />
            <Cancel />
          </>
        }
        round
      />
      <Input
        value="Adorn button"
        adornRight={
          <Button round icon color="subtle" size="mini">
            <Cancel />
          </Button>
        }
        round
      />
    </Stack>
  ),
  'In Header': () => (
    <Page.Header>
      <Input round placeholder="Search..." />
    </Page.Header>
  ),
};
