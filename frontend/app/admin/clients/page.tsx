import { PageListHeader } from "@/components/PageHeader/PageListHeader";
import { Datatable } from "@/components/UI/Datatable";

const cols = [
  { alias: 'name', title: 'Nome' },
  { alias: 'title', title: 'Titulo' },
  { alias: 'email', title: 'Email' },
  { alias: 'role', title: 'Perfil' },
]

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
]

export default function Clients({ searchParams }: { [key: string]: string | string[] | undefined }) {

  console.log(searchParams)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageListHeader
        title="Clientes"
        createLink="/clients/create"
      />
      <Datatable
        cols={cols}
        rows={people}
      />
    </div>
  )
}