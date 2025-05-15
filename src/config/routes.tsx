import { Route } from '../interfaces/route'
import { Icons } from '@/components/ui/icons'

export const routes: Route[] = [
  {
    id: 1,
    menu: 'Main',
    link: '/calculation',
    mainPath: 'calculation',
    title: 'Calculation',
    icon: <Icons.Home />,
    isCollapse: false,
    isShow: true,
    submenus: [],
  },
  {
    id: 2,
    link: '/analysis',
    mainPath: 'analysis',
    title: 'Analysis',
    icon: <Icons.ClipboardIcon />,
    isCollapse: false,
    isShow: true,
    submenus: [],
  },
  {
    id: 3,
    link: '/calculator',
    mainPath: '/calculator',
    title: 'Calculator',
    icon: <Icons.FileText />,
    isCollapse: false,
    isShow: true,
    submenus: [],
  },
]
