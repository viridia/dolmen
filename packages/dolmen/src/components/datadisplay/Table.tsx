import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps } from 'solid-js';
import { css, scrollbars, theme, Z } from '../../styles';

const tableCellCss = css({
  padding: '6px 8px 8px 8px',
  borderWidth: 0,
  // borderRight: `1px solid ${theme.colors.fieldBorderSlight}`,

  '&:last-child': {
    borderRightWidth: 0,
  },

  'thead &': {
    backgroundColor: '$elevation0',
    position: 'sticky',
    top: 0,
    zIndex: Z.focused,
    fontWeight: 'bold',
  },

  'thead &:after': {
    content: '',
    bottom: '0',
    borderBottom: `2px solid ${theme.colors.fieldBorderSlight}`,
    position: 'absolute',
    left: 0,
    right: 0,
  },

  variants: {
    textAlign: {
      center: {
        textAlign: 'center',
      },
      start: {
        textAlign: 'start',
      },
      end: {
        textAlign: 'end',
      },
      left: {
        textAlign: 'left',
      },
      right: {
        textAlign: 'right',
      },
    },
  },
});

const TableCell: ParentComponent<
  JSX.HTMLAttributes<HTMLTableCellElement> & VariantProps<typeof tableCellCss>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'textAlign']);

  return (
    <td
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [tableCellCss({
          textAlign: local.textAlign,
        })]: true,
      }}
    />
  );
};

const tableRowCss = css({
  'tbody > &:nth-child(even)': {
    backgroundColor: theme.colors.elevation1,
  },
});

const TableRow: ParentComponent<JSX.HTMLAttributes<HTMLTableRowElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <tr
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [tableRowCss()]: true,
      }}
    />
  );
};

const tableHeadCss = css({
  // borderBottom: `2px solid ${theme.colors.fieldBorder}`,
});

const TableHead: ParentComponent<JSX.HTMLAttributes<HTMLTableSectionElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <thead
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [tableHeadCss()]: true,
      }}
    />
  );
};

const tableBodyCss = css(
  {
    overflowY: 'auto',
    // '&:hover': {
    //   backgroundColor: '$itemHoverBg',
    // },
  },
  scrollbars
);

const TableBody: ParentComponent<JSX.HTMLAttributes<HTMLTableSectionElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList']);

  return (
    <tbody
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [tableBodyCss()]: true,
      }}
    />
  );
};

const tableCss = css({
  // alignItems: 'stretch',
  backgroundColor: '$elevation0',
  // borderWidth: 0,
  // borderColor: '$fieldBorderSlight',
  // borderWidth: '1px',
  // borderStyle: 'solid',
  color: '$text',
  borderCollapse: 'collapse',
  position: 'relative',
});

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
        [tableCss()]: true,
      }}
    />
  );
};

Table.Row = TableRow;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Cell = TableCell;
