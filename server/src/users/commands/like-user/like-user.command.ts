import { ValidatedUserDto } from 'users/dto';

export class LikeUserCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly userPairId: string,
  ) {}
}
