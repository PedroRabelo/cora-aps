import { PatientRiskFactor } from "@prisma/client";

export class PatientRiskFactorEntity implements PatientRiskFactor {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  healthRecordId: string;
  riskFactorId: string;
}