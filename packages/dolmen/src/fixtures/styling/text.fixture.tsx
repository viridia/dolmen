import { Code, CodeBlock, Stack, Header, Text } from '../../components';

export const $category = 'styling';

function TextStyles() {
  return (
    <Stack gap="lg" alignItems="start">
      <Header>Title (default)</Header>
      <Header as="header">Title (header)</Header>
      <Header as="h1">Title (h1)</Header>
      <Header as="h2">Title (h2)</Header>
      <Header as="h3">Title (h3)</Header>
      <Header as="h4">Title (h4)</Header>
      <Header as="h5">Title (h5)</Header>
      <Code>code{'\n'}(inline)</Code>
      <CodeBlock>code{'\n'}(block)</CodeBlock>
      <Text>text</Text>
      <Text size="xl">text XL</Text>
      <Text size="xs">text XS</Text>
      <Text dim>text dim</Text>
      <Text em>text em</Text>
      <Text>
        text <Text as="sup">sup</Text>
        <Text as="sub">sub</Text>
      </Text>
    </Stack>
  );
}

export default () => <TextStyles />;
