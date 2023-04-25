import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { PatientStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsEnum(PatientStatus)
  status: PatientStatus;
}
