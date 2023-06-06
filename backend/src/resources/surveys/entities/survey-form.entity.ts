import { SurveyForm } from '@prisma/client';

export class SurveyFormEntity implements SurveyForm {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  title: string;
  alias: string;
  description: string;
  resultLowRisk: number;
  resultMediumRisk: number;
  resultHighRisk: number;
}
