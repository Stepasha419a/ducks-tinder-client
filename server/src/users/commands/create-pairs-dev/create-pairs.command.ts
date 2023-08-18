import { ValidatedUserDto } from 'users/dto';

export class CreatePairsCommand {
  constructor(public readonly user: ValidatedUserDto) {}
}
