import { UsersSelector } from 'users/users.selector';
import { USER_SORTS_DATA } from './users.const.dto';

export const GET_SORTED_FIND_FIRST_CALLED = {
  where: {
    id: { notIn: USER_SORTS_DATA.userIds },
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
    place: {
      latitude: {
        gte: 11.8952289,
        lte: 12.7961289,
      },
      longitude: {
        gte: 11.8952289,
        lte: 12.7961289,
      },
    },
    sex: USER_SORTS_DATA.preferSex,
    preferSex: USER_SORTS_DATA.sex,
  },
  select: UsersSelector.selectShortUser(),
};
