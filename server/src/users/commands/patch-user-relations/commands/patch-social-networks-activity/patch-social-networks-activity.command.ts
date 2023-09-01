import { NotValidatedUserDto } from 'users/dto';

export class PatchSocialNetworksActivityCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly socialNetworksActivity: string | null,
  ) {}
}
