import { Question } from "@/components/Survey/Question"
import { listSurveyQuestions } from "@/services/SurveyService"
import { SurveyQuestionModel } from "@/types/Survey"

export default async function SurveyGeneralHealth() {

  const questions: SurveyQuestionModel[] = await listSurveyQuestions('clhqredv60000roguvilxdu00')

  return (
    <div className='pt-4 space-y-4 divide-y divide-gray-200'>
      {questions.length > 0 &&
        questions.map((question) => (
          <Question question={question} key={question.id} />
        ))
      }
    </div>
  )
}