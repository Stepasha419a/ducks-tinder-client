import { useAppSelector } from '@hooks';
import type {
  ChangeablePartnerSettingsFields,
  ChangeableUserFields,
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
        settingInputName as ChangeablePartnerSettingsFields
      ]
    : currentUser[settingInputName as ChangeableUserFields];
}
