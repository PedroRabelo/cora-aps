import { PageListHeader } from "@/components/PageHeader/PageListHeader";
import { Datatable } from "@/components/UI/Datatable";

const cols = [
  { alias: 'name', title: 'Nome', phoneMask: false, dateMask: false, cpfMask: false },
  { alias: 'title', title: 'Titulo', phoneMask: false, dateMask: false, cpfMask: false },
  { alias: 'email', title: 'Email', phoneMask: false, dateMask: false, cpfMask: false },
  { alias: 'role', title: 'Perfil', phoneMask: false, dateMask: false, cpfMask: false },
]

const people = [
  { id: 1, name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { id: 2, name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
]

export const metadata = {
  title: 'Cora Saúde | Clientes',
}

export default function Clients({ searchParams }: { [key: string]: string | string[] | undefined }) {

  console.log(searchParams)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageListHeader
        title="Clientes"
        createLink="/admin/clients/new"
      />
      <Datatable
        cols={cols}
        rows={people}
      />
    </div>
  )
}