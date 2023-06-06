import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCarePlanDTO } from "../dto/create-care-plan.dto";
import { PatientsService } from "./patients.service";
import { PatientStatus } from "@prisma/client";

@Injectable()
export class CarePlanService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientsService
  ) { }

  async create(createCarePlanDTO: CreateCarePlanDTO) {
    const carePlan = await this.prisma.patientCarePlan.create({
      data: createCarePlanDTO
    })

    const patient = await this.prisma.patient.findFirst({
      where: {
        healthRecord: {
          some: {
            id: createCarePlanDTO.healthRecordId
          }
        }
      }
    })
    await this.patientService.changeStatus(patient.id, PatientStatus.ACTIVE)

    return carePlan
  }
}