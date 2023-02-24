import { IUser } from '../../../models/IUser';

export function makeQuerySortsObj(user: IUser, requestedUsers?: string[]) {
  return {
    distance: user.partnerSettings.distance,
    onlyNear: user.partnerSettings.usersOnlyInDistance,
    age: user.age,
    preferAge: {
      min: user.partnerSettings.age.from,
      max: user.partnerSettings.age.to,
    },
    sex: user.sex,
    preferSex: user.partnerSettings.preferSex,
    userIds: requestedUsers
      ? requestedUsers
      : user.checkedUsers?.length
      ? user.checkedUsers
      : [],
  };
}
