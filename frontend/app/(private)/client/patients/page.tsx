import { PageListHeader } from "@/components/PageHeader/PageListHeader";
import { Datatable } from "@/components/UI/Datatable";
import { listPatientsByTenant } from "@/services/PatientService";
import { getCurrentUser } from "@/services/UserService";
import { Suspense } from "react";

const cols = [
  { alias: 'cpf', title: 'CPF', phoneMask: false, dateMask: false, cpfMask: true },
  { alias: 'name', title: 'Nome', phoneMask: false, dateMask: false, cpfMask: false },
  { alias: 'birthDate', title: 'Data nascimento', phoneMask: false, dateMask: true, cpfMask: false },
  { alias: 'email', title: 'E-mail', phoneMask: false, dateMask: false, cpfMask: false },
]

export const metadata = {
  title: 'Cora Saúde | Pacientes',
}

export default async function Patients({ searchParams }: { [key: string]: string | string[] | undefined }) {
  console.log(searchParams)

  const currentUser = await getCurrentUser();
  const patients = await listPatientsByTenant(currentUser.tenantId);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageListHeader
        title="Pacientes"
        createLink="/client/patients/new"
      />
      <Suspense fallback={<div>Carregando...</div>}>
        <Datatable
          cols={cols}
          rows={patients}
          pathLink="client/patients/edit"
        />
      </Suspense>
    </div>
  )
}