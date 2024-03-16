import type { User } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import type { MultiSelectForm } from '@entities/user/model/setting';
import { getSelectSettingFields } from '../helpers';
import type { ProfileSettingNameEnum } from '../constants';

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
