import { IsString } from "class-validator";
import { PatientRiskFactorEntity } from "../entities/patient-risk-factor.entity";

export class AddRiskFactorDTO extends PatientRiskFactorEntity {
  @IsString()
  healthRecordId: string;

  @IsString()
  riskFactorId: string;
}