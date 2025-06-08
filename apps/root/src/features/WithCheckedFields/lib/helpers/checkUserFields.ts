import type { Setting, User } from '@ducks-tinder-client/common';

import { SettingNameEnum } from '@entities/user';

const potentialFields: Setting[] = [
  SettingNameEnum.DESCRIPTION,
  SettingNameEnum.SEX,
  'place',
  'age',
  'distance',
  SettingNameEnum.PREFER_SEX,
  'preferAgeFrom',
  'preferAgeTo',
];

function checkField(user: User, field: Setting): Setting | boolean {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (field) {
    case SettingNameEnum.DESCRIPTION:
      if (user.description === '') {
        return SettingNameEnum.DESCRIPTION;
      }
      return false;
    case 'place':
      if (!user.place) {
        return 'place';
      }
      return false;
    case SettingNameEnum.SEX:
      if (!user.sex) {
        return SettingNameEnum.SEX;
      }
      return false;
    case 'age':
      if (!user.age) {
        return 'age';
      }
      return false;
    case 'distance':
      if (!user.distance) {
        return 'distance';
      }
      return false;
    case SettingNameEnum.PREFER_SEX:
      if (!user.preferSex) {
        return SettingNameEnum.PREFER_SEX;
      }
      return false;
    case 'preferAgeFrom':
      if (!user.preferAgeFrom) {
        return 'preferAgeFrom';
      }
      return false;
    case 'preferAgeTo':
      if (!user.preferAgeTo) {
        return 'preferAgeTo';
      }
      return false;
    default:
      return false;
  }
}

export function checkUserFields(user: User): Setting[] {
  return potentialFields.reduce(
    (acc: Setting[], field: Setting) =>
      checkField(user, field) ? [...acc, field] : acc,
    []
  );
}
