import type { QuerySorts, User } from '@shared/api/interfaces';

export function makeQuerySortsObj(
  user: User,
  requestedUsers?: string[]
): QuerySorts {
  const userIds =
    requestedUsers ?? user.checkedUsers.length ? user.checkedUsers : [];
  return {
    distance: user.partnerSettings.distance,
    onlyNear: user.partnerSettings.usersOnlyInDistance,
    age: user.age,
    preferAge: { ...user.partnerSettings.age },
    sex: user.sex,
    preferSex: user.partnerSettings.preferSex,
    userIds,
  };
}
