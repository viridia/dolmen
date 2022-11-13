import { Stack, TextArea } from '../../components';
import { cx } from '../../styles';

export const $category = 'form';

const defaultText =
  "His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden.";

export default {
  Sizes: () => (
    <Stack gap="md" classList={cx({ w: '20rem' })}>
      <TextArea size="xl" classList={cx({ h: '5rem' })} value={defaultText} />
      <TextArea size="lg" classList={cx({ h: '5rem' })} value={defaultText} />
      <TextArea size="md" classList={cx({ h: '5rem' })} value={defaultText} />
      <TextArea size="sm" classList={cx({ h: '5rem' })} value={defaultText} />
      <TextArea size="xs" classList={cx({ h: '5rem' })} value={defaultText} />
    </Stack>
  ),
  Variants: () => (
    <Stack gap="md" classList={cx({ w: '20rem' })}>
      <TextArea classList={cx({ h: '5rem' })} value={defaultText} />
      <TextArea classList={cx({ h: '5rem' })} disabled value="disabled" />
      <TextArea classList={cx({ h: '5rem' })} readonly value="readonly" />
      <TextArea classList={cx({ h: '5rem' })} placeholder="placeholder" value="" />
    </Stack>
  ),
};
