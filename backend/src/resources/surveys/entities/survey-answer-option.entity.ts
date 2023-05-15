import { SurveyAnswerOption } from "@prisma/client";

export class SurveyAnswerOptionEntity implements SurveyAnswerOption {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  answer: string;
  points: number;
  questionId: string;
}