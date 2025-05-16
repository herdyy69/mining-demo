'use client'
import { TableAnalysis } from './table'
import { PumpFlowRateChart } from './analytic'
import React from 'react'

function generateDummyData() {
  const product = ['Hydraulics', 'Parametric', 'Tripping', 'Param-Tripping', 'P-V-T']
  const percent = Math.floor(Math.random() * 100)
  const d10 = Math.floor(Math.random() * 100)
  const d50 = Math.floor(Math.random() * 100)
  const d90 = Math.floor(Math.random() * 100)
  const m_percent = Math.floor(Math.random() * 100)

  const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  return {
    product: randomItem(product),
    percent: percent,
    d10: d10,
    d50: d50,
    d90: d90,
    m_percent: m_percent,
  }
}

export default function Page() {
  const [value, setValue] = React.useState<any[]>([])
  const [loadedDataList, setLoadedDataList] = React.useState<any[]>([])

  React.useEffect(() => {
    setLoadedDataList(Array.from({ length: 10 }, () => generateDummyData()))
  }, [])

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
    <div className='grid grid-cols-3 gap-4'>
      <div className='card col-span-2 space-y-6'>
        <TableAnalysis data={data} value={value} setValue={setValue} />
      </div>
      <div className='card h-max pb-1 pl-2'>
        <PumpFlowRateChart />
      </div>
    </div>
  )
}
