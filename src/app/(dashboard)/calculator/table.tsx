'use client'
import Cell from '@/components/ui/table/cells'
import DataTable from '@/components/ui/table/dataTable'
import React from 'react'
import { useTableRowsSelection } from '@/hooks/useTableRowsSelection'
import { RowSelectionState } from '@tanstack/react-table'

export const TableAnalysis = ({ data }: { data: any }) => {
  const { selectedRows, onRowSelectionChange, onAllRowsSelectionChange } = useTableRowsSelection<RowSelectionState>()

  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: any }) => {
        return (
          <Cell.Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: onAllRowsSelectionChange(table),
            }}
          />
        )
      },
      cell: ({ row }: any) => (
        <div className='px-1'>
          <Cell.Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: onRowSelectionChange(row),
            }}
          />
        </div>
      ),
      size: 50,
    },
    {
      header: 'Product',
      accessorKey: 'product',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'Percent',
      accessorKey: 'percent',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'D10',
      accessorKey: 'd10',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'D50',
      accessorKey: 'd50',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'D90',
      accessorKey: 'd90',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'M Percent',
      accessorKey: 'm_percent',
      enableSorting: true,
      size: 200,
    },
  ]

  return <DataTable dataQuery={data} columns={columns} isServerSide={true} emptyText='orang' withPagination={false} />
}
