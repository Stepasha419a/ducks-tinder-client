import { useAppSelector } from '@hooks';
import type {
  ChangablePartnerSettingsFields,
  ChangableUserFields,
} from '@shared/interfaces';

export function useDefaultValues(): string | string[] {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const innerObjectName = useAppSelector(
    (state) => state.setting.innerObjectName
  );
  const settingInputName = useAppSelector(
    (state) => state.setting.settingInputName
  );

  return innerObjectName
    ? currentUser[innerObjectName][
        settingInputName as ChangablePartnerSettingsFields
      ]
    : currentUser[settingInputName as ChangableUserFields];
}
