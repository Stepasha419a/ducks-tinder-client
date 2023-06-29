import { User } from '@prisma/client';
import { PatchUserPlaceDto } from 'users/dto';

export class PatchUserPlaceCommand {
  constructor(
    public readonly user: User,
    public readonly dto: PatchUserPlaceDto,
  ) {}
}
