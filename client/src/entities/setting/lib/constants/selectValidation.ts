import type { ProfileSettingName, SelectValidation } from '../../model';

export const SELECT_VALIDATION: Record<ProfileSettingName, SelectValidation> = {
  interests: { maxLength: 16 },
};
