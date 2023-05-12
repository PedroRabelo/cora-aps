import { PageListHeader } from "@/components/PageHeader/PageListHeader";
import { Datatable } from "@/components/UI/Datatable";
import { listPatientsByStatus } from "@/services/PatientService";
import { Suspense } from "react";

const cols = [
  { alias: 'name', title: 'Nome', phoneMask: false, dateMask: false, cpfMask: false },
  { alias: 'birthDate', title: 'Data nascimento', phoneMask: false, dateMask: true, cpfMask: false },
  { alias: 'email', title: 'E-mail', phoneMask: false, dateMask: false, cpfMask: false },
  { alias: 'phoneNumber', title: 'Telefone', phoneMask: true, dateMask: false, cpfMask: false },
]

export default async function Evaluation() {

  const patients = await listPatientsByStatus('INITIAL_EVALUATION')

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageListHeader
        title="Pacientes"
      />
      <Suspense fallback={<div>Carregando...</div>}>
        <Datatable
          cols={cols}
          rows={patients}
          pathLink="aps/evaluation"
          pathSuffix="health"
        />
      </Suspense>
    </div>
  )
}