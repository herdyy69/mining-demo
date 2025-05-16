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
    { name: 'Rig', params: 'rig', icon: <Icons.DraftingCompassIcon /> },
    { name: 'Formation', params: 'formation', icon: <Icons.BoxGeoIcon /> },
    { name: 'Survey', params: 'survey', icon: <Icons.BinocularsIcon /> },
    { name: 'Geometry', params: 'geometry', icon: <Icons.BoxGeo2Icon /> },
    { name: 'Fluid System', params: 'fluid-System', icon: <Icons.FluidIcon /> },
    { name: 'Temperature', params: 'temperature', icon: <Icons.Thermometer /> },
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
        {searchParams.get('tab') === 'rig' && <FormRig />}
        {searchParams.get('tab') === 'formation' && <FormFormation />}
        {searchParams.get('tab') === 'survey' && <FormSurvey />}
        {searchParams.get('tab') === 'geometry' && <FormGeometry />}
        {searchParams.get('tab') === 'fluid-System' && <FormFluid />}
        {searchParams.get('tab') === 'temperature' && <FormTemperature />}
      </div>
    </div>
  )
}
