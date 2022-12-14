import { Button, Stack, Card, Header, Group } from '../../components';

export const $category = 'layout';

function CardDemo() {
  return (
    <Stack gap="lg" style={{ 'align-self': 'stretch' }}>
      <Card>
        <Card.Content>
          <Header>Sample Card</Header>
          On the other hand, we denounce with righteous indignation and dislike men who are so
          beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire,
          that they cannot foresee the pain and trouble that are bound to ensue; and equal blame
          belongs to those who fail in their duty through weakness of will, which is the same as
          saying through shrinking from toil and pain.
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Header>Card</Header>
          These cases are perfectly simple and easy to distinguish. In a free hour, when our power
          of choice is untrammelled and when nothing prevents our being able to do what we like
          best, every pleasure is to be welcomed and every pain avoided. But in certain
          circumstances and owing to the claims of duty or the obligations of business it will
          frequently occur that pleasures have to be repudiated and annoyances accepted. The wise
          man therefore always holds in these matters to this principle of selection: he rejects
          pleasures to secure other greater pleasures, or else he endures pains to avoid worse
          pains.
        </Card.Content>
        <Card.Content>
          <Group gap="md" justifyContent="end">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </Group>
        </Card.Content>
      </Card>
    </Stack>
  );
}

export default () => <CardDemo />;
