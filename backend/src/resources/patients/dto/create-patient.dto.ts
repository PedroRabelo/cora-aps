import { IsDate, IsEmail, IsString } from "class-validator";
import { PatientEntity } from "../entities/patient.entity";

export class CreatePatientDto extends PatientEntity {
  @IsString()
  tenantId: string;

  @IsString()
  cpf: string;

  @IsString()
  name: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  gender: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;
}
