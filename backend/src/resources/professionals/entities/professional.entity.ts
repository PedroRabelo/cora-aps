import { Professional, ProfessionalFunction, ProfessionalProvider } from "@prisma/client";

export class ProfessionalEntity implements Professional {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  cpf: string;
  name: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
  email: string;
  provider: ProfessionalProvider;
  providerNumber: string;
  providerCountry: string;
  function: ProfessionalFunction;
  linkVirtualOffice: string;
  specialtyId: string;
  userId: string;
}

