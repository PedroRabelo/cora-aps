import { IsString } from "class-validator";
import { PatientHealthRecordEntity } from "../entities/patient-health-record.entity";

export class CreateHealthRecordDTO extends PatientHealthRecordEntity {
  @IsString()
  patientId: string;
}