import { ValidatedUserDto } from 'users/dto';

export class DeletePairCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly userPairId: string,
  ) {}
}
