import { User } from '@prisma/client';
import { UpdateUserDto } from 'users/dto';

export class PatchUserCommand {
  constructor(public readonly user: User, public readonly dto: UpdateUserDto) {}
}
