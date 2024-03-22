import type { ProfileSettingSelectNameEnum } from '@/entities/user/lib';

export const PROFILE_SETTING_TITLES: Record<
  ProfileSettingSelectNameEnum,
  string
> = {
  interests: 'Interests',
  zodiacSign: 'What is your zodiac sign?',
  education: 'What is your education level?',
  childrenAttitude: 'Do you want children?',
  personalityType: 'What`s your personality type?',
  communicationStyle: 'What is your communication style?',
  attentionSign: 'How do you receive love?',
  pet: 'Do you have any pets?',
  alcoholAttitude: 'How often do you drink?',
  smokingAttitude: 'How often do you smoke?',
  trainingAttitude: 'Do you workout?',
  foodPreference: 'What are your dietary preferences?',
  socialNetworksActivity: 'How active are you on social media?',
  chronotype: 'What are your sleeping habits?',
};
