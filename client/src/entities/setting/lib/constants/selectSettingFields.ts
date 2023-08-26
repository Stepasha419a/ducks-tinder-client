import type { PartialUser } from '@shared/api/interfaces';
import type { ProfileSettingName, ProfileSettingSelectName } from '../../model';

// array as fields of user model like user.interests
export const SELECT_SETTING_FIELDS: Record<
  ProfileSettingName,
  ProfileSettingSelectName[] & PartialUser
> = {
  interests: ['interests'],
};
