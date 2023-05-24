'use client'

import { SurveyModel, SurveyQuestionModel } from "@/types/Survey"
import { Question } from "./Question"
import { Button } from "../UI/Button"
import { useSurvey } from "@/contexts/SurveyContext"
import { useEffect } from "react"

interface Props {
  questions: SurveyQuestionModel[]
  survey: SurveyModel
}

export function SurveyForm({ questions, survey }: Props) {

  const { saveSurveyAnswers, setSurvey, isLoading } = useSurvey()

  useEffect(() => {
    setSurvey(survey)
  }, [setSurvey, survey])

  return (
    <div className='pt-4 space-y-4 divide-y divide-gray-200'>
      {questions.length > 0 &&
        questions.map((question) => (
          <Question
            question={question}
            key={question.id}
            surveyId={survey.id}
          />
        ))
      }
      <div className="flex p-2 justify-end">
        <Button
          title="Salvar"
          type="button"
          onClick={saveSurveyAnswers}
          disabled={isLoading}
          loading={isLoading}
        />
      </div>
    </div>

  )
}