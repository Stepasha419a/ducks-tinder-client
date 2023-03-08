import { SettingChangedArrayData } from '../interfaces';
import { useAppSelector } from '../../../hooks';
import {
  ChangablePartnerSettingsFields,
  ChangableUserFields,
} from '../../../redux/settings/settings.interfaces';

export function useDefaultValues(): string | SettingChangedArrayData {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const innerObjectName = useAppSelector(
    (state) => state.settings.innerObjectName
  );
  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );

  let data: string | string[] | SettingChangedArrayData = innerObjectName
    ? currentUser[innerObjectName][
        settingInputName as ChangablePartnerSettingsFields
      ]
    : currentUser[settingInputName as ChangableUserFields];

  if (Array.isArray(data)) {
    data = data.map((item) => ({
      name: item,
    }));
  }

  return data;
}
