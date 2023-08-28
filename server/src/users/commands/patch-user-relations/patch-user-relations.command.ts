import { NotValidatedUserDto, PatchUserRelationsDto } from 'users/dto';

export class PatchUserRelationsCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly dto: PatchUserRelationsDto,
  ) {}
}
