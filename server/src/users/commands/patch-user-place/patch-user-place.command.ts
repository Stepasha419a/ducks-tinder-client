import { NotValidatedUserDto, PatchUserPlaceDto } from 'users/dto';

export class PatchUserPlaceCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly dto: PatchUserPlaceDto,
  ) {}
}
