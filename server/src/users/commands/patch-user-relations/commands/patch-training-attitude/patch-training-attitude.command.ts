import { NotValidatedUserDto } from 'users/dto';

export class PatchTrainingAttitudeCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly trainingAttitude: string | null,
  ) {}
}
