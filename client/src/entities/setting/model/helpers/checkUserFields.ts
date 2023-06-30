import type { User } from '@shared/api/interfaces';
import type { ErrorField } from '../setting.interfaces';

const potentialFields: ErrorField[] = [
  'description',
  'sex',
  'interests',
  'place',
  'age',
  'distance',
  'preferSex',
  'preferAgeFrom',
  'preferAgeTo',
];

function checkField(user: User, field: ErrorField): ErrorField | boolean {
  switch (field) {
    case 'description':
      if (user.description === '') {
        return 'description';
      }
      return false;
    case 'interests':
      if (!user.interests.length) {
        return 'interests';
      }
      return false;
    case 'place':
      if (!user.place) {
        return 'place';
      }
      return false;
    case 'sex':
      if (!user.sex) {
        return 'sex';
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
    case 'preferSex':
      if (!user.preferSex) {
        return 'preferSex';
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

export function checkUserFields(user: User): ErrorField[] {
  return potentialFields.reduce(
    (acc: ErrorField[], field: ErrorField) =>
      checkField(user, field) ? [...acc, field] : acc,
    []
  );
}
