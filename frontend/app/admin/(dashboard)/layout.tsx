import { ReactNode } from "react"
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar"


interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <div>
        <AdminSidebar />
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
