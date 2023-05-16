import { SurveyAnswerOption } from "@/types/Survey";

type OptionProps = {
  questionId: string;
  answers: SurveyAnswerOption[];
  answerChanged: (questionId: string, answer: SurveyAnswerOption) => void;
}

export default function Option({ questionId, answers, answerChanged }: OptionProps) {

  return (
    <div className="flex flex-row space-x-4">
      {answers.length > 0 && answers.map(a => (
        <div key={a.id} className="flex items-center">
          <input
            type="radio"
            name={questionId.toString()}
            value={a.answer}
            onChange={(e) => {
              answerChanged(questionId, {
                id: a.id,
                answer: e.target.value,
                points: a.points
              });
            }}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label className="ml-3 block text-sm font-medium text-gray-700">
            {a.answer}
          </label>
        </div>
      ))}
    </div>
  );
}
