import { Tenant } from "@prisma/client";

export class TenantEntity implements Tenant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  cnpj: string;
  slug: string;
  email: string;
  phoneNumber: string;
}
