'use client'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormHydraulics } from './formHydraulics'
import { FormParametric } from './formParametric'
import { FormTripping } from './formTripping'
import { FormParamsTripping } from './formParamsTripping'
import { FormPvt } from './formPvt'

export default function Page() {
  const searchParams = useSearchParams()

  const menu = [
    { name: 'Hydraulics', params: 'hydraulics', icon: <Icons.HydraulicsIcon /> },
    { name: 'Parametric', params: 'parametric', icon: <Icons.MatrixIcon /> },
    { name: 'Tripping', params: 'tripping', icon: <Icons.GlobeIcon /> },
    { name: 'Param-Tripping', params: 'param-Tripping', icon: <Icons.TrippingIcon /> },
    { name: 'P-V-T', params: 'P-V-T', icon: <Icons.RulerIcon /> },
  ]

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='card flex h-max flex-col gap-2'>
        {menu.map((item) => (
          <Link
            key={item.name}
            href={`/analysis/xx-xxx-1?tab=${item.params}`}
            className={cn(
              'text-greyscale-7 hover:bg-lime hover:text-greyscale-9 flex items-center gap-2 rounded-lg p-4',
              {
                'bg-lime text-greyscale-9 hover:text-greyscale-9': item.params === searchParams.get('tab'),
              },
            )}
          >
            {item.icon}
            <span className='plabs-title-medium-14'>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className='col-span-4'>
        {searchParams.get('tab') === 'hydraulics' && <FormHydraulics />}
        {searchParams.get('tab') === 'parametric' && <FormParametric />}
        {searchParams.get('tab') === 'tripping' && <FormTripping />}
        {searchParams.get('tab') === 'param-Tripping' && <FormParamsTripping />}
        {searchParams.get('tab') === 'P-V-T' && <FormPvt />}
      </div>
    </div>
  )
}
