import { PatientVitalSignsForm } from "@/components/Forms/PatientVitalSignsForm";
import { HealthFormContainer } from "./HealthFormContainer";
import { PatientMeasuresForm } from "@/components/Forms/PatientMeasuresForm";

export default function EvaluationHealthData() {

  //TODO Salvar o prontuário ao abrir a tela se não existir

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