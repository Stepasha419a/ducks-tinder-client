import { NotValidatedUserDto } from 'users/dto';

export class PatchCommunicationStyleCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly communicationStyle: string | null,
  ) {}
}
