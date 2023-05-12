export type SurveyModel = {
  id: string;
  startDate: Date;
  endDate: Date;
  patientId: string;
  surveyFormId: string;
}

export type CreateSurveyDTO = {
  startDate: Date;
  patientId: string;
  surveyFormId: string;
}

export type SurveyQuestionModel = {
  id: string;
  question: string;
  subtitle: string;
  order: number;
  answerType: 'CHECKBOX' | 'RADIO' | 'TEXT' | 'SELECT';
  answerOptions: string[];
}

export type SaveSurveyAnswerDTO = {
  answer: string;
  surveyQuestionId: string;
  surveyId: string;
}

export type SurveyPatientModel = {
  id: string;
  startDate: Date,
  endDate: Date,
  surveyForm: { title: true }
}

export type SurveyFormModel = {
  id: string;
  title: string;
}
