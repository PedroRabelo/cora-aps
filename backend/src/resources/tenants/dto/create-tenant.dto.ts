import { IsEmail, IsString } from "class-validator";
import { TenantEntity } from "../entities/tenant.entity";

export class CreateTenantDto extends TenantEntity {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsString()
  slug: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;
}
