import { useAppSelector } from '../../../hooks';
import type {
  ChangablePartnerSettingsFields,
  ChangableUserFields,
} from '../../../shared/interfaces';

export function useDefaultValues(): string | string[] {
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
