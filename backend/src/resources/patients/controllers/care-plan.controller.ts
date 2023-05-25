import { Body, Controller, Post } from "@nestjs/common";
import { CarePlanService } from "../services/care-plan.service";
import { CreateCarePlanDTO } from "../dto/create-care-plan.dto";

@Controller('patient/carePlan')
export class CarePlanController {
  constructor(private readonly carePlanService: CarePlanService) { }

  @Post()
  create(@Body() createCarePlanDTO: CreateCarePlanDTO) {
    return this.carePlanService.create(createCarePlanDTO)
  }
}