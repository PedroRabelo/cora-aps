export type PatientHealthRecordModel = {
  id: string;
  patientId: string;
  professionalId: string;
  startDate: string;
  riskGroup: string;
  careLine: string;
}

export type CreatePatientHealthRecordDTO = {
  patientId: string;
}

export type CreatePatientVitalSignsDTO = {
  healthRecordId: string;
  temperature: number;
  diastolicPressure: number;
  systolicPressure: number;
  heartRate: number;
  respiratoryFrequency: number;
  oxygenSaturation: number;
}

export type PatientVitalSignsModel = {
  id: string;
  healthRecordId: string;
  measurementDate: string;
  measurementBy: string;
  temperature: number;
  diastolicPressure: number;
  systolicPressure: number;
  heartRate: number;
  respiratoryFrequency: number;
  oxygenSaturation: number;
}

export type CreatePatientMeasureDTO = {
  healthRecordId: string;
  height: number;
  weight: number;
  abdominalCircumference: number;
}

export type PatientMeasureModel = {
  id: string;
  healthRecordId: string;
  measurementDate: string;
  measurementBy: string;
  height: number;
  weight: number;
  abdominalCircumference: number;
}

export type AddRiskFactorDTO = {
  healthRecordId: string;
  riskFactorId: string;
}

export type RiskFactorModel = {
  id: string;
  name: string;
}

export type HealthRecordRiskFactorModel = {
  id: string;
  riskFactor: RiskFactorModel
}

export type CreateCarePlanDTO = {
  startDate: string;
  complexity: PatientStatusType;
  careLineId: string;
  healthRecordId: string;
}

let CareComplexity: {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

export const careComplexity = {
  HIGH: 'Alta',
  MEDIUM: 'Média',
  LOW: 'Baixa',
};

export type PatientStatusType = (typeof CareComplexity)[keyof typeof CareComplexity]