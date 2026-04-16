import type { ProfileSettingSelectNameEnum } from '@entities/user';

const PROFILE_SETTING_TITLES: Record<ProfileSettingSelectNameEnum, string> = {
  interests: 'profile.settings.interests.title',
  zodiacSign: 'profile.settings.moreAboutMe.zodiacSetting',
  education: 'profile.settings.moreAboutMe.educationSetting',
  childrenAttitude: 'profile.settings.moreAboutMe.childrenSetting',
  personalityType: 'profile.settings.moreAboutMe.personalitySetting',
  communicationStyle: 'profile.settings.moreAboutMe.communicationSetting',
  attentionSign: 'profile.settings.moreAboutMe.attentionSetting',
  alcoholAttitude: 'profile.settings.lifestyle.drinkingSetting',
  chronotype: 'profile.settings.lifestyle.chronotypeSetting',
  foodPreference: 'profile.settings.lifestyle.foodSetting',
  pet: 'profile.settings.lifestyle.petSetting',
  smokingAttitude: 'profile.settings.lifestyle.smokingSetting',
  socialNetworksActivity: 'profile.settings.lifestyle.socialSetting',
  trainingAttitude: 'profile.settings.lifestyle.workoutSetting',
};

export function getProfileSettingTitles(
  settingName: ProfileSettingSelectNameEnum
): string {
  return PROFILE_SETTING_TITLES[settingName];
}
