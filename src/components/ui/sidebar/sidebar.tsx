import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import { Route } from '@/interfaces/route'
import { useNavigation } from '@/contexts/navigation'
import { useMenu } from '@/contexts/menu'

import { Icons } from '../icons'
import SidebarCollapse from './sidebarCollapse'
import SidebarItem from './sidebarItem'
import ExpandButton from './expandButton'

const Sidebar = () => {
  const { activeRoute, routes } = useNavigation()
  const { isSidebarCollapse, isMobileMenuOpen, handleCollapseRoute, handleMobileMenu } = useMenu()

  return (
    <div
      className={cn(
        'no-scrollbar bg-greyscale-9 fixed top-0 right-0 bottom-0 left-0 z-21 max-h-screen flex-none shadow-md transition-all duration-200 ease-in-out lg:relative',
        [isSidebarCollapse ? 'lg:w-[80px]' : 'lg:w-[270px]', isMobileMenuOpen ? 'w-full sm:w-1/2' : 'w-0'],
      )}
    >
      <div
        className={cn(
          'hidden items-center justify-end px-4 py-8 lg:flex',
          isSidebarCollapse ? 'justify-center' : 'justify-end gap-6',
        )}
      >
        <ExpandButton />
      </div>
      <div
        className={cn('text-greyscale-10 w-full justify-end px-3 py-8 lg:hidden', isMobileMenuOpen ? 'flex' : 'hidden')}
      >
        <button onClick={() => handleMobileMenu(false)} className='max-w-max'>
          <Icons.X />
        </button>
      </div>
      <div className='flex h-[calc(100%-128px)] w-full flex-1 flex-col gap-4 overflow-hidden'>
        <div className='no-scrollbar flex flex-1 flex-col gap-2 overflow-auto px-4'>
          {routes?.map((route: Route) => {
            if (route.isCollapse) {
              return (
                <SidebarCollapse
                  key={route.id}
                  id={route.id}
                  icon={route.icon}
                  title={route.title}
                  menu={route.menu}
                  submenus={route.submenus}
                  onClick={() => handleCollapseRoute(route)}
                />
              )
            }

            return (
              <SidebarItem
                key={route.id}
                icon={route.icon}
                title={route.title}
                menu={route.menu}
                link={route.link}
                active={activeRoute?.id === route.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
