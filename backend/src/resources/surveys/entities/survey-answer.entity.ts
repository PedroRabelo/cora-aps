import { SurveyAnswer } from '@prisma/client';

export class SurveyAnswerEntity implements SurveyAnswer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  answer: string;
  points: number;
  answerOptionId: string;
  surveyQuestionId: string;
  surveyId: string;
}
