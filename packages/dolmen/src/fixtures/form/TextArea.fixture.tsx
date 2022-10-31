import { Stack, TextArea } from '../../components';

export const $category = 'form';

const defaultText = "His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden."

export default () => (
  <Stack gap="md" w="20rem">
    <TextArea size="xl" h="5rem" value={defaultText} />
    <TextArea size="lg" h="5rem" value={defaultText} />
    <TextArea size="md" h="5rem" value={defaultText} />
    <TextArea size="sm" h="5rem" value={defaultText} />
    <TextArea size="xs" h="5rem" value={defaultText} />
  </Stack>
);
