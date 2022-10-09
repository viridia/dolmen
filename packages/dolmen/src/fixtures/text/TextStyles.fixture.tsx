import { Stack, Title } from '../../components';

export const $category = 'text';

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
    </Stack>
  );
}

export default () => <TextStyles />;
