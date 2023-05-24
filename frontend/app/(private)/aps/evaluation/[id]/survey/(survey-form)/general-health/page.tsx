import { SurveyForm } from "@/components/Survey/SurveyForm";
import { Spinner } from "@/components/UI/Spinner";
import { findOrCreateHealthRecord } from "@/services/HealthRecordService";
import { createSurvey, getSurveyByHealthRecordAndAlias, getSurveyFormByAlias, listSurveyQuestions } from "@/services/SurveyService";
import { PatientHealthRecordModel } from "@/types/Patient";
import { SurveyFormModel, SurveyModel, SurveyQuestionModel } from "@/types/Survey";
import { Suspense } from "react";
interface Props {
  params: { id: string };
}

export default async function SurveyGeneralHealth({ params }: Props) {

  const healthRecord: PatientHealthRecordModel = await findOrCreateHealthRecord({
    patientId: params.id
  })

  let survey: SurveyModel = await getSurveyByHealthRecordAndAlias(healthRecord.id, 'general-health')

  const surveyForm: SurveyFormModel = await getSurveyFormByAlias('general-health');

  if (survey === null) {
    survey = await createSurvey({
      healthRecordId: healthRecord.id,
      startDate: new Date(),
      surveyFormId: surveyForm.id
    })
  }

  const questions: SurveyQuestionModel[] = await listSurveyQuestions(surveyForm.id)

  return (
    <Suspense fallback={<Spinner />}>
      <SurveyForm
        questions={questions}
        survey={survey}
      />
    </Suspense>
  )
}