import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserEntity } from "src/resources/users/entities/user.entity";
import { CreateMeasureDTO } from "../dto/create-measure.dto";
import { MeasuresService } from "../services/measures.service";

@Controller('patient/measures')
export class MeasuresController {
  constructor(private readonly measuresService: MeasuresService) { }

  @Post()
  create(@Body() createMeasureDTO: CreateMeasureDTO, @CurrentUser() user: UserEntity) {
    return this.measuresService.create(createMeasureDTO, user.id);
  }

  @Get(':healthRecordId')
  findByHealthRecord(@Param('healthRecordId') healthRecordId: string) {
    return this.measuresService.findByHealthRecord(healthRecordId);
  }
}