import { List, ListItem } from '../../components';

export const $category = 'data display';

function ListDemo() {
  return (
    <List style={{ width: '10rem', height: '7rem' }}>
      <ListItem>Alpha Wolf</ListItem>
      <ListItem>Beta Test</ListItem>
      <ListItem selected>Delta Dawn</ListItem>
      <ListItem>Gamma Ray</ListItem>
      <ListItem>Omega Man</ListItem>
    </List>
  );
}

export default () => <ListDemo />;
