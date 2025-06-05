'use client'

import { NavigationProvider } from '@/contexts/navigation'
import { cn } from '@/lib/utils'

import { MenuProvider } from '@/contexts/menu'

import Sidebar from '../sidebar/sidebar'
import Navbar from '../navbar/navbar'
import { Icons } from '../icons'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Dashboard = ({ children }: { children: any }) => {
  const pathname = usePathname()

  const breadcrumb = pathname
    ?.split('/')
    ?.filter(Boolean)
    ?.map((segment) =>
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
  return (
    <NavigationProvider>
      <MenuProvider>
        <div className='relative flex min-h-screen w-full overflow-hidden'>
          <Sidebar />
          <div className='relative h-full w-full overflow-hidden'>
            <Navbar
              data={{
                guid: 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                name: 'John Doe',
                email: 'johndoe@company.com',
                roles: [],
                access_token: '',
                refresh_token: '',
              }}
            />
            <main
              className={cn(
                'no-scrollbar bg-greyscale-10 relative h-screen w-full space-y-4 overflow-auto p-6 pt-[104px]',
              )}
            >
              <div className='space-y-4'>
                <div className='plabs-caption-regular-14 card flex items-center gap-[6px]'>
                  <div className='text-greyscale-0 flex items-center gap-[6px]'>
                    <Icons.HomeIcon className='size-[16px]' />
                    <p>Dashboard</p>
                  </div>
                  {breadcrumb.map((item, index) => (
                    <div key={index} className='flex items-center gap-[6px]'>
                      <ChevronRight className='text-greyscale-6 h-4 w-4' />
                      <p className='text-greyscale-6'>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              {children}
            </main>
          </div>
        </div>
      </MenuProvider>
    </NavigationProvider>
  )
}

export default Dashboard
