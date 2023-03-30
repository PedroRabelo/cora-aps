import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  login: string;
  password: string;
  name: string;
  email: string;
  role: Role;
  tenantId: string;
}
