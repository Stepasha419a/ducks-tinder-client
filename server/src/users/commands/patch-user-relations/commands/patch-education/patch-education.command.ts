import { NotValidatedUserDto } from 'users/dto';

export class PatchEducationCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly education: string | null,
  ) {}
}
