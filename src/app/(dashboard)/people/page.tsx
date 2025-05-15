import { Icons } from '@/components/ui/icons'
import TableSearch from '@/components/ui/table/core/tableSearch'
import Link from 'next/link'
import { TablePeople } from './table'
import { SearchParams } from '@/schemas/api'
import { peopleList } from '@/service/poeple_service'

export default async function Page(params: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await params.searchParams
  const data = await peopleList(resolvedSearchParams)

  console.log('peopleList', data)

  return (
    <div className='card space-y-4'>
      <div className='space-y-1'>
        <h1 className='plabs-title-medium-20 text-greyscale-9'>List orang</h1>
        <p className='plabs-body-regular-14 text-greyscale-6'>Kelola orang pada halaman ini.</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <TableSearch placeholder='Cari nama orang..' />
        </div>
        <Link href='/people/create' className='btn-green'>
          Tambah Orang <Icons.Plus className='size-4' />
        </Link>
      </div>
      <TablePeople data={data} />
    </div>
  )
}
