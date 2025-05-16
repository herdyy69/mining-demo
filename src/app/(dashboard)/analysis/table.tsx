'use client'
import Cell from '@/components/ui/table/cells'
import DataTable from '@/components/ui/table/dataTable'
import React from 'react'

export const TableAnalysis = ({ data }: { data: any }) => {
  const columns = [
    {
      header: 'Company',
      accessorKey: 'company',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'Field',
      accessorKey: 'field',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'Well',
      accessorKey: 'well',
      enableSorting: true,
      size: 200,
    },
    {
      id: 'action',
      header: '',
      cell: ({ row }: any) => (
        <div className='flex justify-end gap-2'>
          <Cell.Action>
            <Cell.Action.Item text='Detail' iconType='view' href={`/analysis/xx-xxx-1`} />
          </Cell.Action>
        </div>
      ),
      size: 300,
    },
  ]

  return <DataTable dataQuery={data} columns={columns} isServerSide={true} emptyText='orang' />
}
