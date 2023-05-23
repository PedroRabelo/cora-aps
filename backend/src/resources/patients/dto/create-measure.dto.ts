import { IsNumber, IsString } from "class-validator";
import { PatientMeasureEntity } from "../entities/patient-measure.entity";

export class CreateMeasureDTO extends PatientMeasureEntity {
  @IsString()
  healthRecordId: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  abdominalCircumference: number;
}