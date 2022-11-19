import { For } from 'solid-js';
import { Stack, Table } from '../../components';

export const $category = 'data display';

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function TableDemo() {
  return (
    <Stack style={{ height: '20rem', 'overflow-y': 'auto' }}>
      <Table style={{ 'max-width': '40rem' }}>
        <Table.Head>
          <Table.Row>
            <Table.Cell style={{ width: '5rem' }} textAlign="center">
              Selected
            </Table.Cell>
            <Table.Cell>N</Table.Cell>
            <Table.Cell>2N</Table.Cell>
            <Table.Cell textAlign="end">
              N<sup>2</sup>
            </Table.Cell>
            <Table.Cell>
              N<sup>3</sup>
            </Table.Cell>
            <Table.Cell>
              N<sup>4</sup>
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <For each={rows}>
            {n => (
              <Table.Row>
                <Table.Cell textAlign="center">N</Table.Cell>
                <Table.Cell>{n}</Table.Cell>
                <Table.Cell>{n * 2}</Table.Cell>
                <Table.Cell textAlign="end">{n * n}</Table.Cell>
                <Table.Cell>{n * n * n}</Table.Cell>
                <Table.Cell>{n * n * n}</Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table>
    </Stack>
  );
}

export default () => <TableDemo />;
