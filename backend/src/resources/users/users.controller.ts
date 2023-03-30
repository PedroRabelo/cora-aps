import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const { page } = req.query;

    return this.usersService.findAll(+page);
  }

  @Get('/search')
  searchUsers(@Req() req: Request) {
    const { page, search } = req.query;

    return this.usersService.search(+page, search.toString());
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
