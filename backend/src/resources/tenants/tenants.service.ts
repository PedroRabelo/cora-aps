import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictError } from 'src/common/errors/types/conflict.error';

@Injectable()
export class TenantsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createTenantDto: CreateTenantDto) {
    const tenantExists = await this.prisma.tenant.findUnique({
      where: { cnpj: createTenantDto.cnpj }
    });

    if (tenantExists) {
      throw new ConflictError('Já existe um cliente com este e-mail');
    }

    return await this.prisma.tenant.create({
      data: { ...createTenantDto }
    });
  }

  async findAll() {
    return await this.prisma.tenant.findMany({
      where: {
        active: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
