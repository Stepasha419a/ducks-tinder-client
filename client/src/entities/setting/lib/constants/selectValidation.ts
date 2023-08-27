import type { ProfileSettingSelectName, SelectValidation } from '../../model';

export const SELECT_VALIDATION: Record<
  ProfileSettingSelectName,
  SelectValidation
> = {
  interests: { maxLength: 16 },
  attentionSign: { maxLength: 1 },
  childrenAttitude: { maxLength: 1 },
  communicationStyle: { maxLength: 1 },
  education: { maxLength: 1 },
  personalityType: { maxLength: 1 },
  zodiacSign: { maxLength: 1 },
};
