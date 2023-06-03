import { User } from '@prisma/client';
import { DeletePictureDto } from 'users/dto';

export class DeletePictureCommand {
  constructor(
    public readonly user: User,
    public readonly dto: DeletePictureDto,
  ) {}
}
