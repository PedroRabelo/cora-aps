import { CareComplexity } from "@prisma/client";
import { PatientCarePlanEntity } from "../entities/patient-care-plan.entity";
import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateCarePlanDTO extends PatientCarePlanEntity {
  @IsDate()
  startDate: Date;

  @IsString()
  complexity: CareComplexity;

  @IsString()
  careLineId: string;

  @IsString()
  healthRecordId: string;

  @IsString()
  @IsOptional()
  description: string;
}