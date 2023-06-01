import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCareLineDto } from './dto/create-care-line.dto';

@Injectable()
export class CareLineService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCareLineDto: CreateCareLineDto) {
    return await this.prisma.careLine.create({
      data: createCareLineDto
    })
  }

  async findAll() {
    return await this.prisma.careLine.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: "asc"
      }
    });
  }
}
