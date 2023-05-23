export type PatientModel = {
  id: string;
  cpf: string;
  name: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
  email: string;
}

export type PagedPatientModel = {
  patients: PatientModel[];
  count: number;
}

export type CreatePatientDTO = {
  tenantId: string;
  cpf: string;
  name: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  email: string;
}

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