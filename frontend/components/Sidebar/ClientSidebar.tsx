'use client'

import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { MenuNavigation, MenuSidebar } from './MenuNavigation'

interface Props {
  username: string;
}

const navigation: MenuSidebar[] = [
  { name: 'Dashboard', href: '/client', icon: HomeIcon },
  { name: 'Pacientes', href: '/client/patients', icon: UserCircleIcon },
  { name: 'Usuários', href: '/client/users', icon: UserGroupIcon },
]

export function ClientSidebar({ username }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <h2>Cora Saúde</h2>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <MenuNavigation menu={navigation} />
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-white text-bold text-xl">Cora Saúde</h2>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <MenuNavigation menu={navigation} />
              <li className="-mx-6 mt-auto">
                <Link
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                >
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-white">
                    {username.slice(0, 1)}
                  </span>
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{username}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
        <Link href="#">
          <span className="sr-only">Your profile</span>
          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-white">
            {username.slice(0, 1)}
          </span>
        </Link>
      </div>
    </div>
  )
}