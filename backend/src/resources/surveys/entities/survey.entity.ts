import { Survey } from '@prisma/client';

export class SurveyEntity implements Survey {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  healthRecordId: string;
  surveyFormId: string;
}
