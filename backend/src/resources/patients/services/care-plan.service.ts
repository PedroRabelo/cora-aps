import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCarePlanDTO } from "../dto/create-care-plan.dto";

@Injectable()
export class CarePlanService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCarePlanDTO: CreateCarePlanDTO) {
    return await this.prisma.patientCarePlan.create({
      data: createCarePlanDTO
    })
  }
}