import { NotValidatedUserDto, PatchUserDto } from 'users/dto';

export class PatchUserCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly dto: PatchUserDto,
  ) {}
}
