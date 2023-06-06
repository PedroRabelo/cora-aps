import { getOptions, postOptions } from "@/lib/auth";
import { CreateSurveyDTO, SaveSurveyAnswerDTO, SurveyModel } from "@/types/Survey";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/surveys`

export async function createSurvey(survey: CreateSurveyDTO) {
  const options = await postOptions(survey)

  const res = await fetch(`${API_ENDPOINT}`, options)

  return await res.json()
}

export async function getSurveyByHealthRecordAndAlias(healthRecordId: string, alias: string) {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/survey/${healthRecordId}/${alias}`, options)

  if (res.status === 404) {
    return null
  }
  return await res.json()
}

export async function listAllSurveysForm() {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/forms`, options)

  return await res.json()
}

export async function getSurveyFormByAlias(alias: string) {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/forms/${alias}`, options)

  if (res.status === 404) {
    return null
  }
  return await res.json()
}

export async function listSurveyQuestions(surveyFormId: string) {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/questions/${surveyFormId}`, options)

  return await res.json()
}

export async function sumSurveyPoints(healthRecordId: string, alias: string) {
  const options = await getOptions()

  const params = new URLSearchParams()
  params.append("healthRecordId", healthRecordId)
  params.append("alias", alias)

  const res = await fetch(`${API_ENDPOINT}/answers-points?${params}`, options)

  return await res.json()
}