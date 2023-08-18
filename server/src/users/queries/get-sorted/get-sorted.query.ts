import { ValidatedUserDto } from 'users/dto';

export class GetSortedQuery {
  constructor(public readonly user: ValidatedUserDto) {}
}
