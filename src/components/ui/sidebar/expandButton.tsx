import { cn } from '@/lib/utils'

import { useMenu } from '@/contexts/menu'
import { PanelLeft } from 'lucide-react'

const ExpandButton = () => {
  const { handleCollapseSidebar } = useMenu()

  return (
    <div className='transition-all duration-200 ease-in-out'>
      <button onClick={handleCollapseSidebar} className='relative hidden cursor-pointer lg:flex'>
        <div className={cn('transition-all duration-150 ease-in-out')}>
          <PanelLeft className='text-greyscale-5 size-6' />
        </div>
      </button>
    </div>
  )
}

export default ExpandButton
