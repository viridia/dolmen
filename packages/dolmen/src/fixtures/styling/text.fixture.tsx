import { Code, CodeBlock, Stack, Title, Text } from '../../components';

export const $category = 'styling';

function TextStyles() {
  return (
    <Stack gap="lg" alignItems="start">
      <Title>Title (default)</Title>
      <Title as="header">Title (header)</Title>
      <Title as="h1">Title (h1)</Title>
      <Title as="h2">Title (h2)</Title>
      <Title as="h3">Title (h3)</Title>
      <Title as="h4">Title (h4)</Title>
      <Title as="h5">Title (h5)</Title>
      <Code>code{'\n'}(inline)</Code>
      <CodeBlock>code{'\n'}(block)</CodeBlock>
      <Text>text</Text>
      <Text size="xl">text XL</Text>
      <Text size="xs">text XS</Text>
      <Text dim>text dim</Text>
      <Text em>text em</Text>
      <Text>text <Text as="sup">sup</Text><Text as="sub">sub</Text></Text>
    </Stack>
  );
}

export default () => <TextStyles />;
