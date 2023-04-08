'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: true },
  { name: 'Clientes', href: '/admin/clients', icon: UsersIcon, current: false },
  { name: 'Pacientes', href: '/admin/patients', icon: UserCircleIcon, current: false },
  { name: 'Usuários', href: '/admin/users', icon: UserGroupIcon, current: false },
]

export function MenuNavigation() {
  const pathname = usePathname();

  return (
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={clsx(
                item.href === pathname
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
              )}
            >
              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}