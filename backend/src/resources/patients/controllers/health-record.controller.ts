import { Body, Controller, Get, Post } from "@nestjs/common";
import { HealthRecordService } from "../services/health-record.service";
import { CreateHealthRecordDTO } from "../dto/create-health-record.dto";

@Controller('patient/health-record')
export class HealthRecordController {
  constructor(private readonly healthRecordService: HealthRecordService) { }

  @Post()
  findOrCreate(@Body() createHealthRecordDTO: CreateHealthRecordDTO) {
    return this.healthRecordService.findOrCreate(createHealthRecordDTO);
  }

  @Get()
  listAll() {
    return this.healthRecordService.listAll()
  }
}