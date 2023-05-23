import { PatientVitalSignsForm } from "@/components/Forms/PatientVitalSignsForm";
import { HealthFormContainer } from "./HealthFormContainer";
import { PatientMeasuresForm } from "@/components/Forms/PatientMeasuresForm";
import { findOrCreateHealthRecord } from "@/services/HealthRecordService";
import { PatientHealthRecordModel } from "@/types/Patient";
import { getVitalSignsByHealthRecord } from "@/services/VitalSignsService";
import { getMeasuresByHealthRecord } from "@/services/MeasuresService";

interface Props {
  params: { id: string };
}

export default async function EvaluationHealthData({ params }: Props) {

  const healthRecord: PatientHealthRecordModel = await findOrCreateHealthRecord({
    patientId: params.id
  })

  const vitalSignsData = getVitalSignsByHealthRecord(healthRecord.id)
  const measuresData = getMeasuresByHealthRecord(healthRecord.id)

  const [vitalSigns, measures] = await Promise.all([vitalSignsData, measuresData])

  return (
    <>
      <HealthFormContainer
        title="Sinais vitais"
        description="Aferição dos sinais vitais do paciente"
      >
        <PatientVitalSignsForm healthRecordId={healthRecord.id} vitalSigns={vitalSigns} />
      </HealthFormContainer>

      <HealthFormContainer
        title="Antropometria"
        description="Aferição das medidas do paciente"
      >
        <PatientMeasuresForm healthRecordId={healthRecord.id} measures={measures} />
      </HealthFormContainer>
    </>
  )
}