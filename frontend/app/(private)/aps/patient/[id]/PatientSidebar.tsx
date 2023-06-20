'use client'

import { MenuNavigation, MenuSidebar } from "@/components/Sidebar/MenuNavigation";
import { HomeIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";

interface Props {
  patientId: string
}

export function PatientSidebar({ patientId }: Props) {

  const navigation: MenuSidebar[] = [
    { name: 'Resumo', href: `summary`, icon: HomeIcon },
    { name: 'Perfil', href: `profile`, icon: UsersIcon },
    { name: 'Dados de saúde', href: `health`, icon: UserGroupIcon },
  ]

  return (
    <div className="py-4">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <nav className="flex flex-1">
        <ul role="list" className="space-y-6">
          <MenuNavigation menu={navigation} />
        </ul>
      </nav>
    </div>
  )
}