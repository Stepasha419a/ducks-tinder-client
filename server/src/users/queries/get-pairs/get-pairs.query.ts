import { ValidatedUserDto } from 'users/dto';

export class GetPairsQuery {
  constructor(public readonly user: ValidatedUserDto) {}
}
