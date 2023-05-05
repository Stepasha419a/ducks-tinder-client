import { useAppSelector } from '@hooks';

export type ChangeablePartnerSettingsFields = 'place' | 'preferSex';
export type ChangeableUserFields =
  | 'email'
  | 'name'
  | 'description'
  | 'nickname'
  | 'sex'
  | 'interests';

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
