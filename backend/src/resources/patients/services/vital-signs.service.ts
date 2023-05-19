import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVitalSignsDTO } from "../dto/create-vital-signs.dto";

@Injectable()
export class VitalSignsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createVitalSignsDTO: CreateVitalSignsDTO, currentUser: string) {
    const vitalSignsExists = await this.prismaService.patientVitalSigns.findMany({
      where: {
        healthRecordId: createVitalSignsDTO.healthRecordId
      }
    })

    // Salvar no histórico
    if (vitalSignsExists.length > 0) {
      const history = vitalSignsExists[0]

      await this.prismaService.patientVitalSignsHistory.create({
        data: history
      })

      await this.prismaService.patientVitalSigns.deleteMany({
        where: {
          healthRecordId: history.healthRecordId
        }
      })
    }

    return await this.prismaService.patientVitalSigns.create({
      data: {
        measurementBy: currentUser,
        measurementDate: new Date(),
        ...createVitalSignsDTO
      }
    })
  }
}