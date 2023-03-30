import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConflictError } from 'src/common/errors/types/conflict.error';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new ConflictError('Já existe um usuário com este e-mail');
    }

    const data: Prisma.UserUncheckedCreateInput = {
      ...createUserDto,
      login: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      active: true,
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll(page: number) {
    //Items per page
    const take = 10;
    let skip = 0;
    if (page) {
      skip = (page - 1) * take;
    }

    const users = await this.prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const count = await this.prisma.user.count();

    return {
      users,
      count,
    };
  }

  async search(page: number, search: string) {
    //Items per page
    const take = 10;
    let skip = 0;
    if (page) {
      skip = (page - 1) * take;
    }

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    };

    const users = await this.prisma.user.findMany({
      skip,
      take,
      where: where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const count = await this.prisma.user.count({
      where: where,
    });

    return {
      users,
      count,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    let emailExists: User;
    if (updateUserDto.email !== undefined) {
      emailExists = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists !== null && emailExists.id !== id) {
        throw new ConflictError('Já existe um usuário com este e-mail');
      }

      if (!emailExists) {
        data.login = updateUserDto.email;
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        tenantId: true,
      },
    });
  }
}
