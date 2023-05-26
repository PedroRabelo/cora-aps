import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHealthRecordDTO } from "../dto/create-health-record.dto";
import { AddRiskFactorDTO } from "../dto/add-risk-factor.dto";

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

  async listAllRiskFactor() {
    return await this.prisma.riskFactor.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })
  }

  async addRiskFactor(addRiskFactorDTO: AddRiskFactorDTO) {
    return await this.prisma.patientRiskFactor.create({
      data: addRiskFactorDTO
    })
  }

  async findAllRiskFactorByHealthRecord(id: string) {
    return await this.prisma.patientRiskFactor.findMany({
      where: {
        healthRecordId: id
      },
      select: {
        id: true,
        riskFactor: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }

  async removeHealthRecordRiskFactor(id: string) {
    await this.prisma.patientRiskFactor.delete({
      where: {
        id
      }
    })
  }
}