import { AuthorizedUser } from 'users/users.interface';
import { PatchUserPlaceDto } from 'users/dto';

export class PatchUserPlaceCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: PatchUserPlaceDto,
  ) {}
}
