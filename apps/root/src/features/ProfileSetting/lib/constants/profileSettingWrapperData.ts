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
    title: 'Edit interests',
    description:
      'Choose the interests that you would like to share with your couples. Specify at least 3 interests.',
  },
  moreAboutMe: {
    title: 'More about me',
    description:
      'Reveal yourself from the best side by telling more about yourself',
  },
  lifestyle: {
    title: 'Lifestyle',
    description: 'Bring your best self forward by adding your lifestyle',
  },
  default: {
    title: 'Default title',
    description: 'Default description.',
  },
};
