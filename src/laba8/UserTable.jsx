import {
  useTable,
  useSortBy,
  useColumnOrder,
  useBlockLayout,
  useResizeColumns,
} from 'react-table';
import { FixedSizeList } from 'react-window';
import { Box, Button } from '@mui/material';
import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import 'C:/Projects/ssvr/labs/src/laba8/UserTable.css';

export default function UserTable({ users, onDelete, onBlock }) {
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const columns = useMemo(() => [
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Роль',
      accessor: 'role',
    },
    {
      Header: 'Статус',
      accessor: (row) => (row.blocked ? 'Заблокирован' : 'Активен'),
      id: 'blocked',
    },
    {
      Header: 'Действия',
      accessor: 'actions',
      Cell: ({ row }) => {
        const isCurrentUser = row.original.id === currentUserId;
        return (
          <>
            <Button
              size="small"
              color="error"
              className="table-button"
              onClick={() => onDelete(row.original.id)}
              disabled={isCurrentUser}
            >
              Удалить
            </Button>
            <Button
              size="small"
              className="table-button"
              onClick={() => onBlock(row.original.id, !row.original.blocked)}
              disabled={isCurrentUser}
            >
              {row.original.blocked ? 'Разблокировать' : 'Заблокировать'}
            </Button>
          </>
        );
      },
    },
  ], [onDelete, onBlock, currentUserId]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data: users },
    useSortBy,
    useColumnOrder,
    useBlockLayout,
    useResizeColumns
  );

  const RenderRow = useCallback(({ index, style }) => {
    const row = rows[index];
    prepareRow(row);
    const { key, ...rowProps } = row.getRowProps({ style });

    return (
      <div key={key} {...rowProps} className="tr">
        {row.cells.map((cell) => {
          const { key: cellKey, ...cellProps } = cell.getCellProps();
          return (
            <div key={cellKey} {...cellProps} className="td">
              {cell.render('Cell')}
            </div>
          );
        })}
      </div>
    );
  }, [rows, prepareRow]);

  return (
    <div className="table-wrapper">
      <Box {...getTableProps()}>
        <div className="thead">
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <div key={key} {...headerGroupProps} className="tr">
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <div key={columnKey} {...columnProps} className="th">
                      {column.render('Header')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={400}
            itemCount={rows.length}
            itemSize={60}
            width="100%"
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </Box>
    </div>
  );
}
