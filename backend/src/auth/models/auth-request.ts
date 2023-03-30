import { Request } from 'express';
import { UserEntity } from 'src/resources/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
