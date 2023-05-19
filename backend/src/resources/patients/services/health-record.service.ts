import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHealthRecordDTO } from "../dto/create-health-record.dto";

@Injectable()
export class HealthRecordService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findOrCreate(createHealthRecordDto: CreateHealthRecordDTO) {
    const healthRecordExists = await this.prisma.patientHealthRecord.findMany({
      where: {
        patientId: createHealthRecordDto.patientId
      }
    })

    if (healthRecordExists.length > 0) {
      return healthRecordExists[0]
    }

    return await this.prisma.patientHealthRecord.create({
      data: {
        startDate: new Date(),
        ...createHealthRecordDto
      }
    })
  }

  async listAll() {
    return await this.prisma.patientHealthRecord.findMany()
  }
}