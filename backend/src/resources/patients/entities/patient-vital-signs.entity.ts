import { PatientVitalSigns } from "@prisma/client";

export class PatientVitalSignsEntity implements PatientVitalSigns {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  healthRecordId: string;
  measurementDate: Date;
  measurementBy: string;
  temperature: number;
  diastolicPressure: number;
  systolicPressure: number;
  heartRate: number;
  respiratoryFrequency: number;
  oxygenSaturation: number;
}