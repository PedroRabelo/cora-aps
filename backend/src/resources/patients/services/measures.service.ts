import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMeasureDTO } from "../dto/create-measure.dto";
import { NotFoundError } from "src/common/errors/types/notFound.error";

@Injectable()
export class MeasuresService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createMeasureDTO: CreateMeasureDTO, currentUser: string) {
    const measuresExists = await this.prismaService.patientMeasure.findMany({
      where: {
        healthRecordId: createMeasureDTO.healthRecordId
      }
    })

    // Salvar no histórico
    if (measuresExists.length > 0) {
      const history = measuresExists[0]

      await this.prismaService.patientMeasureHistory.create({
        data: history
      })

      await this.prismaService.patientMeasure.deleteMany({
        where: {
          healthRecordId: history.healthRecordId
        }
      })
    }

    const heightMeters = createMeasureDTO.height / 100;
    const imc = (createMeasureDTO.weight / (Math.pow(heightMeters, 2))).toFixed(2);

    return await this.prismaService.patientMeasure.create({
      data: {
        measurementBy: currentUser,
        measurementDate: new Date(),
        imc: parseFloat(imc),
        ...createMeasureDTO
      }
    })
  }

  async findByHealthRecord(healthRecordId: string) {
    const data = await this.prismaService.patientMeasure.findFirst({
      where: {
        healthRecordId
      }
    })

    if (data === null) throw new NotFoundError('Nenhum registro encontrado')

    return data
  }
}