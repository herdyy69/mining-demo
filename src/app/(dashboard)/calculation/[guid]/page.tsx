'use client'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormDescription } from './formDescription'
import { FormRig } from './formRig'
import { FormFormation } from './formFormation'
import { FormSurvey } from './formSurvey'
import { FormGeometry } from './formGeometry'
import { FormFluid } from './formFluid'
import { FormTemperature } from './formTemperature'

export default function Page() {
  const searchParams = useSearchParams()

  const menu = [
    { name: 'Description', params: 'description', icon: <Icons.DocumentIcon /> },
    { name: 'Input', params: 'input', icon: <Icons.DraftingCompassIcon /> },
    { name: 'BHA', params: 'bha', icon: <Icons.BoxGeoIcon /> },
    { name: 'Survey', params: 'survey', icon: <Icons.BinocularsIcon /> },
    { name: 'Pump Data', params: 'pump_data', icon: <Icons.BoxGeo2Icon /> },
    { name: 'Breakdown', params: 'breakdown', icon: <Icons.FluidIcon /> },
    { name: 'Grafik', params: 'grafik', icon: <Icons.Thermometer /> },
  ]

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='card flex h-max flex-col gap-2'>
        {menu.map((item) => (
          <Link
            key={item.name}
            href={`/calculation/xx-xxx-1?tab=${item.params}`}
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
        {searchParams.get('tab') === 'description' && <FormDescription />}
        {searchParams.get('tab') === 'input' && <FormRig />}
        {searchParams.get('tab') === 'bha' && <FormFormation />}
        {searchParams.get('tab') === 'survey' && <FormSurvey />}
        {searchParams.get('tab') === 'pump_data' && <FormGeometry />}
        {searchParams.get('tab') === 'breakdown' && <FormFluid />}
        {searchParams.get('tab') === 'grafik' && <FormTemperature />}
      </div>
    </div>
  )
}
