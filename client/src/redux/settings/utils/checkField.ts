import { User } from '../../../models/User';
import { ErrorField } from '../settings.interfaces';

const potentialFields: ErrorField[] = [
  'description',
  'sex',
  'interests',
  'place',
  'distance',
  'preferSex',
];

function checkField(user: User, field: ErrorField) {
  switch (field) {
    case 'description':
      if (user.description === '') {
        return 'description';
      }
      return false;
    case 'sex':
      if (user.sex !== 'male' && user.sex !== 'female') {
        return 'sex';
      }
      return false;
    case 'interests':
      if (!user.interests.length) {
        return 'interests';
      }
      return false;
    case 'place':
      if (user.partnerSettings.place === '') {
        return 'place';
      }
      return false;
    case 'distance':
      if (user.partnerSettings.distance === 0) {
        return 'distance';
      }
      return false;
    case 'preferSex':
      if (
        user.partnerSettings.preferSex !== 'male' &&
        user.partnerSettings.preferSex !== 'female'
      ) {
        return 'preferSex';
      }
      return false;
  }
}

export function checkUserFields(user: User) {
  return potentialFields.reduce(
    (acc: ErrorField[], field: ErrorField) =>
      checkField(user, field) ? [...acc, field] : acc,
    []
  );
}
