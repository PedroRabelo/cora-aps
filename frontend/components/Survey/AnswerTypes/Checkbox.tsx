
type CheckboxProps = {
  questionId: string;
  answers: string[];
  answerChanged: (questionId: string, value: string) => void;
}

export default function Checkbox({ questionId, answers, answerChanged }: CheckboxProps) {
  return (
    <>
      {
        answers.length > 0 && answers.map(a => (
          <div key={a} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={a}
                aria-describedby="resposta"
                name={questionId.toString()}
                type="checkbox"
                value={a}
                onChange={(e) => {
                  answerChanged(questionId, e.target.value);
                }}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                {a}
              </label>
            </div>
          </div>
        ))
      }
    </>
  );
}
