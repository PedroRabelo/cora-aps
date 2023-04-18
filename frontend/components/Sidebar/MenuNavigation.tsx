'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type MenuSidebar = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref">>
}

interface Props {
  menu: MenuSidebar[]
}

export function MenuNavigation({ menu }: Props) {
  const pathname = usePathname();

  return (
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {menu.map((item) => (
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