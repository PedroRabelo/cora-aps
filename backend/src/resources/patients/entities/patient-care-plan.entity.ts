import { CareComplexity, PatientCarePlan } from "@prisma/client";

export class PatientCarePlanEntity implements PatientCarePlan {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  complexity: CareComplexity;
  careLineId: string;
  description: string;
  healthRecordId: string;
}