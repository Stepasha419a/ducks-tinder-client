import { User } from '../../../models/User/User';
import { ErrorField } from '../settings.interfaces';

const potentialFields: ErrorField[] = [
  'description',
  'interests',
  'place',
];

function checkField(user: User, field: ErrorField) {
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
      if (user.partnerSettings.place === '') {
        return 'place';
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
