export type PatientModel = {
  id: string
  name: string
  cpf: string
  birthDate: string
  email: string
  status: string
  phoneNumber: string
  gender: string
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

let PatientStatus: {
  WAITING_CONFIRMATION: 'WAITING_CONFIRMATION',
  INITIAL_EVALUATION: 'INITIAL_EVALUATION',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING_PAYMENT: 'PENDING_PAYMENT',
};

export const patientStatus = {
  WAITING_CONFIRMATION: 'Aguardando Confirmação',
  INITIAL_EVALUATION: 'Avaliação Inicial',
  ACTIVE: 'Ativo',
  SUSPENDED: 'Suspenso',
  PENDING_PAYMENT: 'Pagamento pendente',
};

export type PatientStatusType = (typeof PatientStatus)[keyof typeof PatientStatus]


