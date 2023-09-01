import { NotValidatedUserDto } from 'users/dto';

export class PatchInterestsCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly interests: string[],
  ) {}
}
