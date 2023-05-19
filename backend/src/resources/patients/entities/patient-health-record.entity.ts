import { PatientHealthRecord } from "@prisma/client";

export class PatientHealthRecordEntity implements PatientHealthRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  patientId: string;
  professionalId: string;
  startDate: Date;
  riskGroup: string;
  careLine: string;
}