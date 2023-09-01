import { NotValidatedUserDto } from 'users/dto';

export class PatchChronotypeCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly chronotype: string | null,
  ) {}
}
