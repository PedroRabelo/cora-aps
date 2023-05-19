import { PatientVitalSignsForm } from "@/components/Forms/PatientVitalSignsForm";
import { HealthFormContainer } from "./HealthFormContainer";
import { PatientMeasuresForm } from "@/components/Forms/PatientMeasuresForm";
import { findOrCreateHealthRecord } from "@/services/HealthRecordService";

interface Props {
  params: { id: string };
}

export default async function EvaluationHealthData({ params }: Props) {

  const healthRecord = await findOrCreateHealthRecord({
    patientId: params.id
  })

  return (
    <>
      <HealthFormContainer
        title="Sinais vitais"
        description="Aferição dos sinais vitais do paciente"
      >
        <PatientVitalSignsForm />
      </HealthFormContainer>

      <HealthFormContainer
        title="Antropometria"
        description="Aferição das medidas do paciente"
      >
        <PatientMeasuresForm />
      </HealthFormContainer>
    </>
  )
}