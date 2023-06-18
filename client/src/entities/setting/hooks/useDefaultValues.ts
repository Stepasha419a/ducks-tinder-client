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
  const settingInputName = useAppSelector(
    (state) => state.setting.settingInputName
  );

  return currentUser[settingInputName as ChangeableUserFields];
}
