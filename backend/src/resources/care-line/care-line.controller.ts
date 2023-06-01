import { Body, Controller, Get, Post } from '@nestjs/common';
import { CareLineService } from './care-line.service';
import { CreateCareLineDto } from './dto/create-care-line.dto';

@Controller('care-line')
export class CareLineController {
  constructor(private readonly careLineService: CareLineService) { }

  @Post()
  create(@Body() createCareLineDto: CreateCareLineDto) {
    return this.careLineService.create(createCareLineDto);
  }

  @Get()
  findAll() {
    return this.careLineService.findAll();
  }
}
