import { AuthorizedUser } from 'users/users.interface';
import { DeletePictureDto } from 'users/dto';

export class DeletePictureCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: DeletePictureDto,
  ) {}
}
