import { NotValidatedUserDto } from 'users/dto';

export class PatchPetCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly pet: string | null,
  ) {}
}
