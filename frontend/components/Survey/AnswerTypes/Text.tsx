import { useState } from 'react';

type TextProps = {
  questionId: string;
  answerChanged: (questionId: string, value: string) => void;
}

export default function Text({ questionId, answerChanged }: TextProps) {
  const [text, setText] = useState('');

  function handleAnswerChange() {
    answerChanged(questionId, text);
  }

  return (
    <div>
      <textarea
        name={questionId.toString()}
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={handleAnswerChange}
        className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
        placeholder="Digite a resposta"
      />
    </div>
  );
}
