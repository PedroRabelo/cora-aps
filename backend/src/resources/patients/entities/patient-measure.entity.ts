import { PatientMeasure } from "@prisma/client";

export class PatientMeasureEntity implements PatientMeasure {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  healthRecordId: string;
  measurementDate: Date;
  measurementBy: string;
  height: number;
  weight: number;
  imc: number;
  abdominalCircumference: number;

}