import { SettingChangedData } from '../interfaces';
import { useAppSelector } from '../../../hooks';
import {
  ChangablePartnerSettingsFields,
  ChangableUserFields,
} from '../../../redux/settings/settings.interfaces';

export function useDefaultValues(): SettingChangedData {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const innerObjectName = useAppSelector(
    (state) => state.settings.innerObjectName
  );
  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );

  return innerObjectName
    ? currentUser[innerObjectName][
        settingInputName as ChangablePartnerSettingsFields
      ]
    : currentUser[settingInputName as ChangableUserFields];
}
