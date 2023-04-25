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
