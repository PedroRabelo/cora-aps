export type SurveyModel = {
  id: string;
  startDate: Date;
  endDate: Date;
  healthRecordId: string;
  surveyFormId: string;
}

export type CreateSurveyDTO = {
  startDate: Date;
  healthRecordId: string;
  surveyFormId: string;
}

export type SurveyQuestionModel = {
  id: string;
  question: string;
  subtitle: string;
  order: number;
  answerType: 'CHECKBOX' | 'RADIO' | 'TEXT' | 'SELECT';
  answersOptions: SurveyAnswerOption[];
}

export type SurveyAnswerOption = {
  id: string;
  answer: string;
  points: number;
}

export type SaveSurveyAnswerDTO = {
  answer: string;
  points: number;
  answerOptionId: string;
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
