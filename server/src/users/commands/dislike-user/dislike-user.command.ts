import { ValidatedUserDto } from 'users/dto';

export class DislikeUserCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly userPairId: string,
  ) {}
}
