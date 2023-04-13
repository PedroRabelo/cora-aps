import { ProfessionalFunction, ProfessionalProvider } from "@prisma/client";
import { ProfessionalEntity } from "../entities/professional.entity";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateProfessionalDto extends ProfessionalEntity {
  @IsString()
  cpf: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsString()
  gender: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  provider: ProfessionalProvider;

  @IsString()
  providerNumber: string;

  @IsString()
  providerCountry: string;

  @IsString()
  function: ProfessionalFunction;

  @IsOptional()
  @IsString()
  linkVirtualOffice: string;

  @IsString()
  specialtyId: string;
}
