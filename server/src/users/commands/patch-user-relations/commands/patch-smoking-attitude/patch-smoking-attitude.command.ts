import { NotValidatedUserDto } from 'users/dto';

export class PatchSmokingAttitudeCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly smokingAttitude: string | null,
  ) {}
}
