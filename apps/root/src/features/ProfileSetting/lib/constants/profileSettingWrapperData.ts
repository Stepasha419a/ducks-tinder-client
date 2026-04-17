import type { ProfileSettingNameEnum } from '@entities/user';

export interface ProfileSettingWrapperData {
  title: string;
  description: string;
}

export const PROFILE_SETTING_WRAPPER_DATA: Record<
  ProfileSettingNameEnum | 'default',
  ProfileSettingWrapperData
> = {
  interests: {
    title: 'profile.settings.interests.editTitle',
    description: 'profile.settings.interests.editDescription',
  },
  moreAboutMe: {
    title: 'profile.settings.moreAboutMe.title',
    description: 'profile.settings.moreAboutMe.editDescription',
  },
  lifestyle: {
    title: 'profile.settings.lifestyle.title',
    description: 'profile.settings.lifestyle.editDescription',
  },
  default: {
    title: 'profile.settings.default.editTitle',
    description: 'profile.settings.default.editDescription',
  },
};
