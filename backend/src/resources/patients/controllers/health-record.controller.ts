import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { HealthRecordService } from "../services/health-record.service";
import { CreateHealthRecordDTO } from "../dto/create-health-record.dto";
import { AddRiskFactorDTO } from "../dto/add-risk-factor.dto";

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

  @Post('risk-factor')
  addRiskFactor(@Body() addRiskFactorDTO: AddRiskFactorDTO) {
    return this.healthRecordService.addRiskFactor(addRiskFactorDTO)
  }

  @Get('risk-factors')
  listAllRiskFactors() {
    return this.healthRecordService.listAllRiskFactor()
  }

  @Get('risk-factors/:id')
  findRiskFactorsByHealthRecord(@Param('id') id: string) {
    return this.healthRecordService.findAllRiskFactorByHealthRecord(id)
  }

  @Delete('risk-factor/:id')
  deleteRiskFactor(@Param('id') id: string) {
    return this.healthRecordService.removeHealthRecordRiskFactor(id)
  }
}