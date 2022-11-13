import { Stack, cx } from 'dolmen';
import { RichTextInput } from '../components';

export const $category = 'extras';

const defaultText = "His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden."

export default () => (
  <Stack gap="md" classList={cx({ w: '20rem' })}>
    <RichTextInput h="5rem" defaultValue={defaultText} />
    {/* <RichTextInput size="xl" h="5rem" defaultValue={defaultText} />
    <RichTextInput size="lg" h="5rem" defaultValue={defaultText} />
    <RichTextInput size="md" h="5rem" defaultValue={defaultText} />
    <RichTextInput size="sm" h="5rem" defaultValue={defaultText} />
    <RichTextInput size="xs" h="5rem" defaultValue={defaultText} /> */}
  </Stack>
);
