import { SurveyAnswerOption } from "@/types/Survey";

type CheckboxProps = {
  questionId: string;
  answers: SurveyAnswerOption[];
  answerChanged: (questionId: string, answer: SurveyAnswerOption) => void;
}

export default function Checkbox({ questionId, answers, answerChanged }: CheckboxProps) {
  return (
    <>
      {
        answers.length > 0 && answers.map(a => (
          <div key={a.id} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={a.id}
                aria-describedby="resposta"
                name={questionId.toString()}
                type="checkbox"
                value={a.answer}
                onChange={(e) => {
                  answerChanged(questionId, {
                    id: a.id,
                    answer: e.target.value,
                    points: a.points
                  });
                }}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                {a.answer}
              </label>
            </div>
          </div>
        ))
      }
    </>
  );
}
