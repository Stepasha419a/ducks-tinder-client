import { User } from '@prisma/client';
import { PatchUserDto } from 'users/dto';

export class PatchUserCommand {
  constructor(public readonly user: User, public readonly dto: PatchUserDto) {}
}
