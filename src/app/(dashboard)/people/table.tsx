'use client'
import { toast } from '@/components/ui/alert/toast'
import { DeleteConfirmation } from '@/components/ui/dialog/deleteConfirmation'
import Cell from '@/components/ui/table/cells'
import DataTable from '@/components/ui/table/dataTable'
import { useRouter } from 'next/navigation'
import React from 'react'
import { peopleDelete } from '../../../../_server/service/poeple_service'

export const TablePeople = ({ data }: { data: any }) => {
  const router = useRouter()

  const onDelete = async (guid: string) => {
    try {
      await peopleDelete(guid).then(() => {
        toast.success({
          title: 'Success',
          body: 'Berhasil menghapus orang',
        })
        router.refresh()
      })
    } catch (error) {
      if (error instanceof Error) {
        const validationErrors = JSON.parse(error.message)

        toast.error({
          title: 'Error',
          body: validationErrors[0].message || 'Failed to create class',
        })
      }
    }
  }

  const columns = [
    {
      header: 'ID',
      accessorKey: 'guid',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'Last Name',
      accessorKey: 'first_name',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'First Name',
      accessorKey: 'last_name',
      enableSorting: true,
      size: 200,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      enableSorting: true,
      size: 200,
    },
    {
      id: 'action',
      header: '',
      cell: ({ row }: any) => (
        <div className='flex justify-end gap-2'>
          <Cell.Action>
            <Cell.Action.Item text='Edit' iconType='edit' href={`/people/${row.original.guid}`} />
            <DeleteConfirmation
              trigger={<Cell.Action.Item text='Hapus' iconType='delete' />}
              title='Hapus Orang'
              description='Apakah Anda yakin ingin menghapus orang ini?'
              onConfirm={() => {
                onDelete(row.original.guid)
              }}
            />
          </Cell.Action>
        </div>
      ),
      size: 300,
    },
  ]

  return <DataTable dataQuery={data} columns={columns} isServerSide={true} emptyText='orang' />
}
