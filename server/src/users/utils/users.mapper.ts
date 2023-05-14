import { UserToInterestsRelation } from '../users.interface';
import { UserDto } from '../dto';

export class UsersMapper {
  static mapInterests(userToInterests: UserToInterestsRelation[]) {
    return userToInterests.map((interest) => interest.interest.name);
  }

  static mapUserPair(pair) {
    return new UserDto(pair.userPair);
  }
}
