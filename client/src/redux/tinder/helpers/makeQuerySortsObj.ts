import { User } from '../../../shared/api/interfaces';

export function makeQuerySortsObj(user: User, requestedUsers?: string[]) {
  return {
    distance: user.partnerSettings.distance,
    onlyNear: user.partnerSettings.usersOnlyInDistance,
    age: user.age,
    preferAge: { ...user.partnerSettings.age },
    sex: user.sex,
    preferSex: user.partnerSettings.preferSex,
    userIds: requestedUsers
      ? requestedUsers
      : user.checkedUsers?.length
      ? user.checkedUsers
      : [],
  };
}
