import { ValidatedUserDto } from 'users/dto';

export class AcceptPairCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly userPairId: string,
  ) {}
}
