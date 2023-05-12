
type OptionProps = {
  questionId: string;
  answers: string[];
  answerChanged: (questionId: string, value: string) => void;
}

export default function Option({ questionId, answers, answerChanged }: OptionProps) {

  return (
    <div className="flex flex-row space-x-4">
      {answers.length > 0 && answers.map(a => (
        <div key={a} className="flex items-center">
          <input
            type="radio"
            name={questionId.toString()}
            value={a}
            onChange={(e) => {
              answerChanged(questionId, e.target.value);
            }}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label className="ml-3 block text-sm font-medium text-gray-700">
            {a}
          </label>
        </div>
      ))}
    </div>
  );
}
