

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { handleToastSuccess } from '../lib/toastify';
import { SaveSurveyAnswerDTO, SurveyModel } from '../types/Survey';

type ContextProps = {
  pushAnswer: (answer: SaveSurveyAnswerDTO, questionType: string) => void;
  surveyAnswers: SaveSurveyAnswerDTO[];
  saveSurveyAnswers: () => void;
  survey: SurveyModel | undefined;
  setSurvey: Dispatch<SetStateAction<SurveyModel | undefined>>;
  isLoading: boolean;
};

type FormProviderProps = {
  children: ReactNode;
};

const initialState = {
  pushAnswer: () => { },
  surveyAnswers: [],
  saveSurveyAnswers: () => { },
  survey: undefined,
  setSurvey: () => { },
  isLoading: false
};

const SurveyContext = createContext<ContextProps>(initialState);

function useSurvey() {
  return useContext(SurveyContext);
}

function SurveyProvider({ children }: FormProviderProps) {
  const [survey, setSurvey] = useState<SurveyModel | undefined>();
  const surveyAnswers: SaveSurveyAnswerDTO[] = [];

  const [isLoading, setIsLoading] = useState(false);

  function pushAnswer(answer: SaveSurveyAnswerDTO, questionType: string) {
    setIsLoading(true);
    const questionIndex = surveyAnswers.findIndex(
      (ans) => ans.surveyQuestionId == answer.surveyQuestionId
    );

    if (questionIndex >= 0) {
      const formAnswer = surveyAnswers[questionIndex];
      if (questionType === 'array') {
        if (formAnswer.answer.includes(answer.answer)) {
          // Se a reposta já foi adicionada numa pergunta do tipo array preciso verificar se já existe para remover
          // quando for a ação de desmarcar a opção.
          const answers: string[] =
            surveyAnswers[questionIndex].answer.split(',');

          surveyAnswers[questionIndex].answer = answers
            .splice(
              answers.findIndex((a) => a === answer.answer),
              1
            )
            .toString();
        } else {
          surveyAnswers[questionIndex].answer = formAnswer.answer.concat(
            ', ',
            answer.answer
          );
        }
      } else {
        surveyAnswers[questionIndex] = answer;
      }
    } else {
      // setFormAnswers((prevState => [answer, ...prevState]));
      surveyAnswers.push(answer);
    }
    setIsLoading(false);
  }

  async function saveSurveyAnswers() {
    try {
      if (survey?.id) {
        setIsLoading(true);

        //await saveAnswers(surveyAnswers);
        //await endSurvey(survey?.id);
        setSurvey(undefined);

        handleToastSuccess('Pesquisa finalizada com sucesso');
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      throw new Error(error.response.data.message);
    }
  }

  return (
    <SurveyContext.Provider
      value={{
        pushAnswer,
        surveyAnswers,
        isLoading,
        saveSurveyAnswers,
        survey,
        setSurvey
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export { SurveyProvider, useSurvey };
