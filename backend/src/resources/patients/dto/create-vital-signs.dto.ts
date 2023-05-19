import { IsNumber, IsString } from "class-validator";
import { PatientVitalSignsEntity } from "../entities/patient-vital-signs.entity";

export class CreateVitalSignsDTO extends PatientVitalSignsEntity {
  @IsString()
  healthRecordId: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  diastolicPressure: number;

  @IsNumber()
  systolicPressure: number;

  @IsNumber()
  heartRate: number;

  @IsNumber()
  respiratoryFrequency: number;

  @IsNumber()
  oxygenSaturation: number;
}
