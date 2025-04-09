import type { User } from '@ducks-tinder-client/common';

import { useAppSelector } from '@shared/lib';

import type {
  ProfileSettingNameEnum,
  ProfileSettingSelectNameEnum,
} from '../constants';
import { getSelectSettingFields } from '../helpers';

export interface MultiSelectForm {
  input: Record<ProfileSettingSelectNameEnum, string[] | string | null>;
}

export function useDefaultProfileValues(
  settingName: ProfileSettingNameEnum
): MultiSelectForm {
  const currentUser = useAppSelector((state) => state.user.currentUser!);

  return {
    input: getProfileSelectData(settingName, currentUser),
  } as MultiSelectForm;
}

function getProfileSelectData(
  settingName: ProfileSettingNameEnum,
  currentUser: User
) {
  const fields = getSelectSettingFields(settingName);

  return fields.reduce(
    (data, fieldName) => ({
      ...data,
      [fieldName]: currentUser[fieldName] || null,
    }),
    {}
  );
}
