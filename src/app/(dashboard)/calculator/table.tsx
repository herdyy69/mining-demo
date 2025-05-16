'use client'

import DataTable from '@/components/ui/table/dataTable'
import React, { useEffect, useState } from 'react'

export const TableAnalysis = ({
  data,
  value,
  setValue,
}: {
  data: any
  value: any[]
  setValue: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  useEffect(() => {
    if (selectedRowId) {
      const selectedData = data.data.filter((item: any) => item.percent === selectedRowId)
      setValue(selectedData)
    } else {
      setValue([])
    }
  }, [selectedRowId])

  const handleSelectionChange = (row: any) => () => {
    const rowId = row.original.percent
    setSelectedRowId((prev) => (prev === rowId ? null : rowId))
  }

  const columns = [
    {
      id: 'select',
      header: () => null,
      cell: ({ row }: any) => (
        <div className='px-1'>
          <input
            type='radio'
            name='row-select'
            className='form-radio h-4 w-4 text-blue-600'
            checked={row.original.percent === selectedRowId}
            onChange={handleSelectionChange(row)}
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
