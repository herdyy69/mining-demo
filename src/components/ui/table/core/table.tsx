import { Header, Row, Table as TableType, flexRender } from '@tanstack/react-table'
import {
  Table as TableContainer,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from '@/components/ui/table/core'
import { cn } from '@/lib/utils'
import { Icons } from '../../icons'

interface TableProps<TData> {
  table: TableType<TData>
  isLoading?: boolean
  handleSort: (id: string) => void
  isServerSide?: boolean
  onRowClick?: (row: Row<TData>) => void
  emptyText?: string
}

function Table<TData>({ table, isLoading, handleSort, isServerSide = true, onRowClick, emptyText }: TableProps<TData>) {
  const sortToggler = (header: Header<TData, unknown>, event: any) => {
    // @ts-ignore
    const id = header.column.columnDef.id || header.column.columnDef.accessorKey
    const sortable = header.column.columnDef.enableSorting

    const toggleSortingHandler = header.column?.getToggleSortingHandler()
    if (toggleSortingHandler) {
      toggleSortingHandler(event)
    }

    if (id && sortable && isServerSide) {
      handleSort(id)
    }
  }

  return (
    <TableContainer>
      <TableHeader className='[&_tr]:border-greyscale-9 [&_tr]:border-b'>
        {table.getHeaderGroups().map((header) => (
          <TableRow key={header.id}>
            {header.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{ position: 'relative', width: header.getSize() }}
                  className='bg-greyscale-10 plabs-title-medium-12 text-greyscale-0'
                >
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={(event) => sortToggler(header, event)}
                      className={`${
                        header.column.getCanSort() ? 'cursor-pointer' : ''
                      } flex items-center gap-1 select-none`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' || header.column.getIsSorted() === 'desc' ? (
                        <div className='flex flex-col items-center justify-center'>
                          {header.column.getIsSorted() === 'asc' ? (
                            <Icons.SwapIcon
                              className={cn(
                                'h-2.5 w-2.5',
                                header.column.getIsSorted() === 'asc' ? 'text-greyscale-6' : 'text-greyscale-9',
                              )}
                            />
                          ) : (
                            <Icons.SwapIcon
                              className={cn(
                                'h-2.5 w-2.5',
                                header.column.getIsSorted() === 'desc' ? 'text-greyscale-6' : 'text-greyscale-9',
                              )}
                            />
                          )}
                        </div>
                      ) : null}
                    </div>
                  )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                    ></div>
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 && !isLoading ? (
          <TableEmpty totalColumns={table.getAllColumns().length} text={emptyText} />
        ) : !table.getRowModel().rows.length || isLoading ? (
          <TableSkeleton totalRow={table.getState().pagination.pageSize} totalColumns={table.getAllColumns().length} />
        ) : (
          table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow key={row.id} className={rowIndex % 2 === 0 ? 'bg-greyscale-10' : 'bg-greyscale-9'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: `${cell.column.columnDef.size}px` }}
                  className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row)
                    }
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </TableContainer>
  )
}

export default Table
