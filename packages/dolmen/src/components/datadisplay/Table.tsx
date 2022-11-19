import { ParentComponent, JSX, splitProps } from 'solid-js';

interface TableCellProps {
  textAlign?: 'left' | 'right' | 'start' | 'end' | 'center';
}

const TableCell: ParentComponent<
  JSX.HTMLAttributes<HTMLTableCellElement> & TableCellProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'textAlign']);

  return (
    <td
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-table-cell': true,
        [`dm-align-${local.textAlign}`]: Boolean(local.textAlign),
      }}
    />
  );
};

const TableRow: ParentComponent<JSX.HTMLAttributes<HTMLTableRowElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <tr
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-table-row': true,
      }}
    />
  );
};

const TableHead: ParentComponent<JSX.HTMLAttributes<HTMLTableSectionElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <thead
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-table-head': true,
      }}
    />
  );
};

const TableBody: ParentComponent<JSX.HTMLAttributes<HTMLTableSectionElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <tbody
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-table-body': true,
      }}
    />
  );
};

export const Table: ParentComponent<JSX.HTMLAttributes<HTMLTableElement>> & {
  Row: typeof TableRow;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Cell: typeof TableCell;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <table
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-table': true,
      }}
    />
  );
};

Table.Row = TableRow;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Cell = TableCell;
