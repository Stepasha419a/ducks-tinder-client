import { NotValidatedUserDto } from 'users/dto';

export class PatchChildrenAttitudeCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly childrenAttitude: string | null,
  ) {}
}
