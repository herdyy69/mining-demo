import { Icons } from '@/components/ui/icons'
import TableSearch from '@/components/ui/table/core/tableSearch'
import Link from 'next/link'
import { TableAnalysis } from './table'

function generateDummyData() {
  const companies = ['PT. ABC', 'PT. XYZ', 'PT. Maju Jaya']
  const fields = ['Nusa Tenggara', 'Kalimantan', 'Papua']
  const wells = ['Sumur Tenggeru', 'Sumur Merapi', 'Sumur Lawu', 'Sumur Semeru']

  const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  const randomDate = () =>
    new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

  return {
    company: randomItem(companies),
    field: randomItem(fields),
    well: randomItem(wells),
    created_at: randomDate(),
    updated_at: randomDate(),
  }
}

export default async function Page() {
  const loadedDataList = Array.from({ length: 10 }, () => generateDummyData())

  const data = {
    data: loadedDataList,
    paginate: {
      total_data: 10,
      current_page: 1,
      per_page: 10,
      total_page: 1,
    },
  }

  return (
    <div className='card space-y-6'>
      <h1 className='plabs-headline-regular-24'>Calculation Data</h1>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <TableSearch placeholder='Search Calculation..' />
          <button className='btn-greyscale'>
            <Icons.FilterIcon /> Filter
          </button>
          <button className='btn-greyscale'>
            <Icons.Download className='size-[18px]' /> Export
          </button>
        </div>
        <Link href='/calculation/create?tab=description' className='btn-lime'>
          Add New <Icons.Plus className='size-4' />
        </Link>
      </div>
      <TableAnalysis data={data} />
    </div>
  )
}
