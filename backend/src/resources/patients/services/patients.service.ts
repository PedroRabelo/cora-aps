import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictError } from 'src/common/errors/types/conflict.error';
import { PatientStatus, Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class PatientsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    const patientExists = await this.prisma.patient.findMany({
      where: {
        OR: [
          { cpf: createPatientDto.cpf },
          { email: createPatientDto.email }
        ]
      }
    })

    if (patientExists.length > 0) {
      throw new ConflictError('Paciente já cadastrado.')
    }

    const createdPatient = await this.prisma.patient.create({
      data: {
        active: true,
        status: 'WAITING_CONFIRMATION',
        ...createPatientDto
      }
    })

    const token = Math.floor(1000 + Math.random() * 9000).toString();

    await this.mailService.sendPatientConfirmation(createdPatient, token);

    return createdPatient
  }

  async findAllByTenant(tenantId: string) {
    const patients = await this.prisma.patient.findMany({
      where: {
        active: true,
        tenantId
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        birthDate: true,
        email: true,
        status: true,
        phoneNumber: true,
        gender: true,
      },
      orderBy: {
        name: 'desc'
      }
    })

    return patients;
  }

  async findOne(id: string) {
    return await this.prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        cpf: true,
        birthDate: true,
        phoneNumber: true,
        email: true,
        status: true,
      },
    })
  }

  async findAllByStatus(status: PatientStatus) {
    return await this.prisma.patient.findMany({
      where: { status, active: true },
      select: {
        id: true,
        name: true,
        birthDate: true,
        email: true,
        phoneNumber: true,
      }
    })
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const data: Prisma.PatientUpdateInput = {
      ...updatePatientDto
    }

    const updatedPatient = await this.prisma.patient.update({
      where: { id },
      data
    })

    return updatedPatient;
  }

  async changeStatus(id: string, status: PatientStatus) {
    await this.prisma.patient.update({
      where: {
        id
      },
      data: {
        status
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
