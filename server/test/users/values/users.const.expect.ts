import { UsersSelector } from 'users/utils';
import { USER_SORTS_DATA } from './users.const.dto';

export const GET_SORTED_FIND_FIRST_CALLED = {
  where: {
    id: { notIn: USER_SORTS_DATA.userIds },
    distance: { gt: 0, lte: USER_SORTS_DATA.distance },
    age: {
      gte: USER_SORTS_DATA.preferAgeFrom,
      lte: USER_SORTS_DATA.preferAgeTo,
    },
    preferAgeFrom: {
      lte: USER_SORTS_DATA.age,
    },
    preferAgeTo: {
      gte: USER_SORTS_DATA.age,
    },
    sex: USER_SORTS_DATA.preferSex,
    preferSex: USER_SORTS_DATA.sex,
  },
  select: UsersSelector.selectShortUser(),
};
