import { NotValidatedUserDto } from 'users/dto';

export class PatchAlcoholAttitudeCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly alcoholAttitude: string | null,
  ) {}
}
