import { PageListHeader } from "@/components/PageHeader/PageListHeader";
import { Datatable } from "@/components/UI/Datatable";

const cols = [
  { alias: 'cpf', title: 'CPF' },
  { alias: 'name', title: 'Nome' },
  { alias: 'birthDate', title: 'Data nascimento' },
  { alias: 'email', title: 'E-mail' },
]

export const metadata = {
  title: 'Cora Saúde | Pacientes',
}

export default function Patients({ searchParams }: { [key: string]: string | string[] | undefined }) {

  console.log(searchParams)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageListHeader
        title="Pacientes"
        createLink="/client/patients/new"
      />
      <Datatable
        cols={cols}
        rows={[]}
      />
    </div>
  )
}