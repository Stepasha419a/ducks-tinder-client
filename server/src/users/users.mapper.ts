import { UserToInterestsRelation } from './users.interface';

export class UsersMapper {
  static mapInterests(userToInterests: UserToInterestsRelation[]) {
    return userToInterests.map((interest) => interest.interest.name);
  }
}
