import { UsersSelector } from 'users/utils';
import { USER_SORTS_DTO } from './users.const.dto';

export const GET_SORTED_FIND_FIRST_CALLED = {
  where: {
    id: { notIn: USER_SORTS_DTO.userIds },
    distance: { gt: 0, lte: USER_SORTS_DTO.distance },
    age: {
      gt: USER_SORTS_DTO.preferAgeFrom - 1,
      lt: USER_SORTS_DTO.preferAgeTo + 1,
    },
    preferAgeFrom: {
      lt: USER_SORTS_DTO.age + 1,
    },
    preferAgeTo: {
      gt: USER_SORTS_DTO.age - 1,
    },
    sex: USER_SORTS_DTO.preferSex,
    preferSex: USER_SORTS_DTO.sex,
  },
  select: UsersSelector.selectShortUser(),
};
