import { useSurvey } from '../../contexts/SurveyContext';
import { SurveyQuestionModel } from '../../types/Survey';
import Checkbox from './AnswerTypes/Checkbox';
import Option from './AnswerTypes/Option';
import Text from './AnswerTypes/Text';

type Props = {
  question: SurveyQuestionModel;
}

export function Question({ question }: Props) {
  const { survey, pushAnswer } = useSurvey();

  function answerChanged(questionId: string, value: string) {
    if (survey?.id) {
      pushAnswer({
        answer: value,
        surveyId: survey.id,
        surveyQuestionId: questionId
      }, question.answerType);
    }
  }

  function renderAnswerType() {
    switch (question.answerType) {
      case 'CHECKBOX':
        return (
          <Checkbox
            questionId={question.id}
            answers={question.answerOptions}
            answerChanged={answerChanged}
          />
        );
      case 'RADIO':
        return (
          <Option
            questionId={question.id}
            answers={question.answerOptions}
            answerChanged={answerChanged}
          />
        );
      case 'SELECT':
        console.log('select');
        break;
      case 'TEXT':
        return (
          <Text
            questionId={question.id}
            answerChanged={answerChanged}
          />
        );
      default:
        console.log('default');
    }
  }

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-md sm:p-4">
      <div className="bg-white px-4 py-1 border-b border-gray-200 sm:px-2">
        <h3 className="leading-6 font-medium text-gray-900">
          {question.order} - {question.question}
        </h3>
        <span className="text-sm text-gray-400">{question.subtitle}</span>
      </div>
      <fieldset className="flex flex-1 flex-col mt-4">
        {renderAnswerType()}
      </fieldset>
    </div>
  );
}
