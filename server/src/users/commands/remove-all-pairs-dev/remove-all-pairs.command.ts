import { ValidatedUserDto } from 'users/dto';

export class RemoveAllPairsCommand {
  constructor(public readonly user: ValidatedUserDto) {}
}
