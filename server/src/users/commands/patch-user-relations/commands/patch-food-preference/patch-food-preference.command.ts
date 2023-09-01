import { NotValidatedUserDto } from 'users/dto';

export class PatchFoodPreferenceCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly foodPreference: string | null,
  ) {}
}
