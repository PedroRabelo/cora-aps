import { getOptions, postOptions } from "@/lib/auth";
import { CreateSurveyDTO } from "@/types/Survey";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/surveys`

export async function createSurvey(survey: CreateSurveyDTO) {
  const options = await postOptions(survey)

  const res = await fetch(`${API_ENDPOINT}`, options)

  return await res.json()
}

export async function ListAllSurveysForm() {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/forms`, options)

  return await res.json()
}

export async function listSurveyQuestions(surveyFormId: string) {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/questions/${surveyFormId}`, options)

  return await res.json()
}