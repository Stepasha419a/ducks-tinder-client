import { ShortUser, UserToInterestsRelation } from '../users.interface';
import { UserDto } from '../dto';

export class UsersMapper {
  static mapInterests(userToInterests: UserToInterestsRelation[]) {
    return (
      userToInterests &&
      userToInterests.map((interest) => interest.interest.name)
    );
  }

  static mapUserPairs(pairs): ShortUser[] {
    return pairs.map((pair) => new UserDto(pair.userPair));
  }
}
