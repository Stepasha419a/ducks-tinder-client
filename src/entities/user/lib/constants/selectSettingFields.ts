import type { PartialUser } from '@/shared/api/services/user/user-service.interface';
import type { ProfileSettingNameEnum } from './profileSettingName';
import { ProfileSettingSelectNameEnum } from './profileSettingSelectName';

// array as fields of user model like user.interests
export const SELECT_SETTING_FIELDS: Record<
  ProfileSettingNameEnum,
  ProfileSettingSelectNameEnum[] & PartialUser
> = {
  interests: [ProfileSettingSelectNameEnum.INTERESTS],
  moreAboutMe: [
    ProfileSettingSelectNameEnum.ZODIAC_SIGN,
    ProfileSettingSelectNameEnum.EDUCATION,
    ProfileSettingSelectNameEnum.CHILDREN_ATTITUDE,
    ProfileSettingSelectNameEnum.PERSONAL_TYPE,
    ProfileSettingSelectNameEnum.COMMUNICATION_STYLE,
    ProfileSettingSelectNameEnum.ATTENTION_SIGN,
  ],
  lifestyle: [
    ProfileSettingSelectNameEnum.PET,
    ProfileSettingSelectNameEnum.ALCOHOL_ATTITUDE,
    ProfileSettingSelectNameEnum.SMOKING_ATTITUDE,
    ProfileSettingSelectNameEnum.TRAINING_ATTITUDE,
    ProfileSettingSelectNameEnum.FOOD_PREFERENCE,
    ProfileSettingSelectNameEnum.SOCIAL_NETWORK_ACTIVITY,
    ProfileSettingSelectNameEnum.CHRONOTYPE,
  ],
};
