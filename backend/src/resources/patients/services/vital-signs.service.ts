import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/common/errors/types/notFound.error";
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

  async findByHealthRecord(healthRecordId: string) {
    const data = await this.prismaService.patientVitalSigns.findFirst({
      where: {
        healthRecordId
      }
    })

    if (data === null) throw new NotFoundError('Nenhum registro encontrado')

    return data
  }
}