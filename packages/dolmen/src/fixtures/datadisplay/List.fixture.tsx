import { List } from '../../components';

export const $category = 'data display';

function ListDemo() {
  return (
    <List style={{ width: '10rem', height: '7rem' }}>
      <List.Item>Alpha Wolf</List.Item>
      <List.Item>Beta Test</List.Item>
      <List.Item selected>Delta Dawn</List.Item>
      <List.Item>Gamma Ray</List.Item>
      <List.Item>Omega Man</List.Item>
    </List>
  );
}

export default () => <ListDemo />;
