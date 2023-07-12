import { AuthorizedUser } from 'users/users.interface';
import { PatchUserDto } from 'users/dto';

export class PatchUserCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: PatchUserDto,
  ) {}
}
