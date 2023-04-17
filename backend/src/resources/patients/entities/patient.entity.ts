import { Patient, PatientStatus } from "@prisma/client";

export class PatientEntity implements Patient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  tenantId: string;
  cpf: string;
  name: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
  email: string;
  status: PatientStatus;
}
