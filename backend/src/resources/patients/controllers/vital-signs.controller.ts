import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateVitalSignsDTO } from "../dto/create-vital-signs.dto";
import { VitalSignsService } from "../services/vital-signs.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserEntity } from "src/resources/users/entities/user.entity";

@Controller('patient/vital-signs')
export class VitalSignsController {
  constructor(private readonly vitalSignsService: VitalSignsService) { }

  @Post()
  create(@Body() createVitalSignsDTO: CreateVitalSignsDTO, @CurrentUser() user: UserEntity) {
    return this.vitalSignsService.create(createVitalSignsDTO, user.id);
  }

  @Get(':healthRecordId')
  findByHealthRecord(@Param('healthRecordId') healthRecordId: string) {
    return this.vitalSignsService.findByHealthRecord(healthRecordId);
  }

}