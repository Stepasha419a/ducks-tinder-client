import { NotValidatedUserDto } from 'users/dto';

export class PatchPersonalityTypeCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly personalityType: string | null,
  ) {}
}
