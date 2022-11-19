import { Stack, TextArea } from '../../components';

export const $category = 'form';

const defaultText =
  "His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden.";

export default {
  Sizes: () => (
    <Stack gap="md" style={{ width: '20rem' }}>
      <TextArea size="xl" style={{ height: '5rem' }} value={defaultText} />
      <TextArea size="lg" style={{ height: '5rem' }} value={defaultText} />
      <TextArea size="md" style={{ height: '5rem' }} value={defaultText} />
      <TextArea size="sm" style={{ height: '5rem' }} value={defaultText} />
      <TextArea size="xs" style={{ height: '5rem' }} value={defaultText} />
    </Stack>
  ),
  Variants: () => (
    <Stack gap="md" style={{ width: '20rem' }}>
      <TextArea style={{ height: '5rem' }} value={defaultText} />
      <TextArea style={{ height: '5rem' }} disabled value="disabled" />
      <TextArea style={{ height: '5rem' }} readonly value="readonly" />
      <TextArea style={{ height: '5rem' }} placeholder="placeholder" value="" />
    </Stack>
  ),
};
