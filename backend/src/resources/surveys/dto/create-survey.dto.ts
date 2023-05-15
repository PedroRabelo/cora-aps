import { IsDate, IsString } from "class-validator";
import { SurveyEntity } from "../entities/survey.entity";

export class CreateSurveyDto extends SurveyEntity {
  @IsDate()
  startDate: Date;

  @IsString()
  healthRecordId: string

  @IsString()
  surveyFormId: string;
}
