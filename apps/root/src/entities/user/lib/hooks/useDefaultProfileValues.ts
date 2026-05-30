import type { User } from '@ducks-tinder-client/common';

import type {
  ProfileSettingNameEnum,
  ProfileSettingSelectNameEnum,
} from '../constants';
import { getSelectSettingFields } from '../helpers';
import { useUserStore } from '@ducks-tinder-client/auth';

export interface MultiSelectForm {
  input: Record<ProfileSettingSelectNameEnum, string[] | string | null>;
}

export function useDefaultProfileValues(
  settingName: ProfileSettingNameEnum
): MultiSelectForm {
  const currentUser = useUserStore((state) => state.currentUser);

  return {
    input: getProfileSelectData(settingName, currentUser),
  } as MultiSelectForm;
}

function getProfileSelectData(
  settingName: ProfileSettingNameEnum,
  currentUser: User | null
) {
  if (!currentUser) {
    return null;
  }

  const fields = getSelectSettingFields(settingName);

  return fields.reduce(
    (data, fieldName) => ({
      ...data,
      [fieldName]: currentUser[fieldName] || null,
    }),
    {}
  );
}
