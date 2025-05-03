import {
    useTable,
    useSortBy,
    useBlockLayout,
    useResizeColumns,
  } from 'react-table';
  import { FixedSizeList } from 'react-window';
  import { Box } from '@mui/material';
  import { useMemo, useCallback } from 'react';
  import 'C:/Projects/ssvr/labs/src/laba8/UserTable.css';
  
  export default function FeedbackTable({ feedbacks }) {
    const columns = useMemo(() => [
      {
        Header: 'Айди',
        accessor: 'id',
      },
      {
        Header: 'Пользователь',
        accessor: 'user',
      },
      {
        Header: 'Отзыв',
        accessor: 'message',
      },
    ], []);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      { columns, data: feedbacks },
      useSortBy,
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
  