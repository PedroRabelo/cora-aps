import { IsString } from "class-validator";
import { CareLineEntity } from "../entities/care-line.entity";

export class CreateCareLineDto extends CareLineEntity {
  @IsString()
  name: string;
}
