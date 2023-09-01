import { NotValidatedUserDto } from 'users/dto';

export class PatchAttentionSignCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly attentionSign: string | null,
  ) {}
}
