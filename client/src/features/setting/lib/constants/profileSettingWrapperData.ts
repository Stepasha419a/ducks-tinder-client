import type { ProfileSettingName } from '@/entities/setting/model';

export interface ProfileSettingWrapperData {
  title: string;
  description: string;
}

export const PROFILE_SETTING_WRAPPER_DATA: Record<
  ProfileSettingName | 'default',
  ProfileSettingWrapperData
> = {
  interests: {
    title: 'Edit interests',
    description:
      'Choose the interests that you would like to share with your couples. Specify at least 3 interests.',
  },
  default: {
    title: 'Default title',
    description: 'Default description.',
  },
};
