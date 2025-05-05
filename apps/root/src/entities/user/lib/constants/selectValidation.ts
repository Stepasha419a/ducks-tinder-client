import type { ProfileSettingSelectNameEnum } from './profileSettingSelectName';

export interface SelectValidation {
  maxLength: number;
}

export const SELECT_VALIDATION: Record<
  ProfileSettingSelectNameEnum,
  SelectValidation
> = {
  interests: { maxLength: 16 },
  attentionSign: { maxLength: 1 },
  childrenAttitude: { maxLength: 1 },
  communicationStyle: { maxLength: 1 },
  education: { maxLength: 1 },
  personalityType: { maxLength: 1 },
  zodiacSign: { maxLength: 1 },
  alcoholAttitude: { maxLength: 1 },
  chronotype: { maxLength: 1 },
  foodPreference: { maxLength: 1 },
  pet: { maxLength: 1 },
  smokingAttitude: { maxLength: 1 },
  socialNetworksActivity: { maxLength: 1 },
  trainingAttitude: { maxLength: 1 },
};
