import type { User } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import type {
  MultiSelectForm,
  ProfileSettingName,
} from '@entities/setting/model';
import { getSelectSettingFields } from '../helpers';

export function useDefaultProfileValues(
  settingName: ProfileSettingName
): MultiSelectForm {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return {
    input: getProfileSelectData(settingName, currentUser),
  } as MultiSelectForm;
}

function getProfileSelectData(
  settingName: ProfileSettingName,
  currentUser: User
) {
  const fields = getSelectSettingFields(settingName);

  return fields.reduce(
    (data, fieldName) => ({ ...data, [fieldName]: currentUser[fieldName] }),
    {}
  );
}
