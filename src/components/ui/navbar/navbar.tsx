import Image from 'next/image'
import { cn } from '@/lib/utils'

import { Bell, LogOut, Settings } from 'lucide-react'
import { Auth } from '../../../../_server/schemas/auth'
import { authClient } from '@/lib/auth-client'

const Navbar = ({ data }: { data: Auth }) => {
  return (
    <header className={cn('bg-greyscale-10 absolute top-0 z-30 flex h-[80px] w-full items-center justify-between')}>
      <div className='flex h-full w-full items-center justify-between p-6'>
        <div className='space-y-1'>
          <h2 className='plabs-title-medium-20 text-greyscale-0'>Welcome {data?.name || 'User'}.</h2>
          <p className='plabs-body-regular-14 text-greyscale-5'>Start managing your dashboard.</p>
        </div>
        <div className='flex items-center gap-3'>
          <button className='bg-greyscale-9 flex size-10 items-center justify-center rounded-full'>
            <Bell className='text-greyscale-0 h-6 w-6' />
          </button>
          <button className='bg-greyscale-9 flex size-10 items-center justify-center rounded-full'>
            <Settings className='text-greyscale-0 h-6 w-6' />
          </button>
          <div className='bg-greyscale-9 flex h-10 items-center justify-center gap-5 rounded-full px-[5px] py-[5px]'>
            <div className='flex items-center gap-1.5'>
              <Image
                src='/assets/images/general/avatar.jpeg'
                alt='logo'
                width={32}
                height={32}
                className='size-8 rounded-full'
              />
              <div className='-space-y-1'>
                <h4 className='plabs-title-medium-14 text-greyscale-0'>{data?.name || 'User'}</h4>
                <p className='plabs-caption-regular-12 text-greyscale-3'>
                  {data?.roles?.map((role) => role?.name).join(', ')}
                </p>
              </div>
            </div>
            <button
              onClick={async () => {
                await authClient.signOut()
              }}
              className='hover:bg-greyscale-3 mr-2 cursor-pointer rounded-full p-1.5'
            >
              <LogOut className='text-greyscale-5 h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
