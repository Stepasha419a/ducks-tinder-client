import type { User } from '../../../shared/api/interfaces';
import type { ErrorField } from '../../../shared/interfaces';

const potentialFields: ErrorField[] = ['description', 'interests', 'place'];

type CheckingErrorField = 'description' | 'interests' | 'place';

function checkField(user: User, field: ErrorField): CheckingErrorField | boolean {
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
    default:
      return false;
  }
}

export function checkUserFields(user: User): ErrorField[] {
  return potentialFields.reduce(
    (acc: ErrorField[], field: ErrorField) => (checkField(user, field) ? [...acc, field] : acc),
    []
  );
}
