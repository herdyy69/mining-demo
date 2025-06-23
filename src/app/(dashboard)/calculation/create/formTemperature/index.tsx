'use client'

import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { PumpFlowRateChart } from './analytic'

// Dummy data untuk tabel Cutting Carrying Index
const cuttingCarryingIndexData = [
  { cci: '5,53', lummLength: '2998,92' },
  { cci: '8,62', lummLength: '2971,54' },
  { cci: '4,77', lummLength: '2966,54' },
  { cci: '6,68', lummLength: '2964,47' },
  { cci: '7,51', lummLength: '2955,27' },
  { cci: '7,51', lummLength: '2950,83' },
  { cci: '7,51', lummLength: '2941,24' },
  { cci: '4,24', lummLength: '2671,24' },
  { cci: '6,68', lummLength: '2649,57' },
  { cci: '4,24', lummLength: '1449,57' },
  { cci: '4,24', lummLength: '0' },
]

export const FormTemperature = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='card col-span-2 space-y-2'>
        <h1 className='plabs-headline-regular-24 mb-4'>
          {searchParams.get('tab')
            ? searchParams.get('tab')!.charAt(0).toUpperCase() + searchParams.get('tab')!.slice(1)
            : 'Default'}
        </h1>
        <div className='flex flex-col'>
          <div className='space-y-8'>
            <h2 className='plabs-headline-regular-20 mb-2'>Cutting Carrying Index</h2>
            <table className='border-greyscale-10 w-full overflow-hidden rounded-t-2xl border'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>CCI</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Lumm Length</th>
                </tr>
              </thead>
              <tbody>
                {cuttingCarryingIndexData.map((row, idx) => (
                  <tr key={idx}>
                    <td className='px-2 py-2'>{row.cci}</td>
                    <td className='px-2 py-2'>{row.lummLength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='card h-max pb-1 pl-2'>
        <PumpFlowRateChart data={cuttingCarryingIndexData} />
      </div>
    </div>
  )
}
