import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/user-payload';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: user.tenantId
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError('Endereço de e-mail ou senha incorreto');
  }
}
